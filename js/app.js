(function () {
  'use strict';

  const MILAN_CENTER = [45.4642, 9.19];
  const DEFAULT_ZOOM = 12;

  let map, municipiLayer, hotspotLayer;
  let activeFilter = 'all';
  let hotspotsVisible = true;
  let selectedId = null;

  function getRiskColor(level) {
    const r = RISK_LEVELS.find(l => l.level === level);
    return r ? r.color : '#8b95a8';
  }

  function getRiskLabel(level) {
    const r = RISK_LEVELS.find(l => l.level === level);
    return r ? r.label : 'N/D';
  }

  function getFilteredRisk(data, filter) {
    if (filter === 'all') return data.risk;
    const crime = data.crimes[filter];
    return crime ? crime.level : data.risk;
  }

  function initMap() {
    map = L.map('map', {
      center: MILAN_CENTER,
      zoom: DEFAULT_ZOOM,
      zoomControl: false
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    hotspotLayer = L.layerGroup().addTo(map);
    loadMunicipi();
  }

  function loadMunicipi() {
    fetch('data/municipi.geojson')
      .then(r => {
        if (!r.ok) throw new Error('GeoJSON non trovato');
        return r.json();
      })
      .then(geojson => {
        municipiLayer = L.geoJSON(geojson, {
          style: feature => styleMunicipio(feature),
          onEachFeature: (feature, layer) => {
            const id = feature.properties.MUNICIPIO;
            const name = MUNICIPI_NAMES[id] || `Municipio ${id}`;

            layer.on({
              mouseover: e => highlightLayer(e.target),
              mouseout: e => resetHighlight(e.target),
              click: () => selectZone('municipio', id)
            });

            layer.bindTooltip(
              `<strong>Municipio ${id}</strong><br>${name}`,
              { sticky: true, className: 'map-tooltip' }
            );
          }
        }).addTo(map);

        renderHotspots();
        hideLoader();
      })
      .catch(err => {
        console.error(err);
        hideLoader();
        document.getElementById('zoneDetail').innerHTML =
          '<div class="detail__placeholder"><p>Errore nel caricamento dei confini. Avvia un server HTTP locale.</p></div>';
      });
  }

  function styleMunicipio(feature) {
    const id = feature.properties.MUNICIPIO;
    const data = MUNICIPI_DATA[id];
    const risk = data ? getFilteredRisk(data, activeFilter) : 1;
    const color = getRiskColor(risk);
    const isSelected = selectedId === `municipio-${id}`;

    return {
      fillColor: color,
      fillOpacity: isSelected ? 0.65 : 0.45,
      color: isSelected ? '#fff' : color,
      weight: isSelected ? 2.5 : 1.5,
      opacity: isSelected ? 1 : 0.7
    };
  }

  function highlightLayer(layer) {
    layer.setStyle({ fillOpacity: 0.7, weight: 2.5 });
    layer.bringToFront();
  }

  function resetHighlight(layer) {
    const id = layer.feature.properties.MUNICIPIO;
    const isSelected = selectedId === `municipio-${id}`;
    if (!isSelected) {
      municipiLayer.resetStyle(layer);
    }
  }

  function refreshMunicipiStyles() {
    if (!municipiLayer) return;
    municipiLayer.eachLayer(layer => {
      layer.setStyle(styleMunicipio(layer.feature));
    });
  }

  function renderHotspots() {
    hotspotLayer.clearLayers();
    if (!hotspotsVisible) return;

    HOTSPOTS.forEach(spot => {
      const size = 14 + spot.risk * 3;
      const color = getRiskColor(spot.risk);

      const icon = L.divIcon({
        className: '',
        html: `<div class="hotspot-marker" style="width:${size}px;height:${size}px;background:${color}" title="${spot.name}">!</div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2]
      });

      const marker = L.marker([spot.lat, spot.lng], { icon });

      marker.bindPopup(
        `<div class="popup__title">${spot.name}</div>` +
        `<div class="popup__risk">Rischio: ${getRiskLabel(spot.risk)}</div>` +
        `<p style="margin-top:6px">${spot.desc}</p>`
      );

      marker.on('click', () => selectZone('hotspot', spot.id));
      marker.addTo(hotspotLayer);
    });
  }

  function selectZone(type, id) {
    selectedId = `${type}-${id}`;
    refreshMunicipiStyles();

    if (type === 'municipio') {
      showMunicipioDetail(id);
      closePanelOnMobile();
    } else {
      const spot = HOTSPOTS.find(h => h.id === id);
      if (spot) {
        showHotspotDetail(spot);
        map.setView([spot.lat, spot.lng], 14, { animate: true });
        closePanelOnMobile();
      }
    }
  }

  function showMunicipioDetail(id) {
    const data = MUNICIPI_DATA[id];
    const name = MUNICIPI_NAMES[id];
    if (!data) return;

    const risk = getFilteredRisk(data, activeFilter);
    const color = getRiskColor(risk);

    let crimesHtml = '';
    const crimeEntries = activeFilter === 'all'
      ? Object.entries(data.crimes)
      : data.crimes[activeFilter]
        ? [[activeFilter, data.crimes[activeFilter]]]
        : [];

    crimeEntries.forEach(([key, crime]) => {
      const ct = CRIME_TYPES.find(c => c.id === key);
      const cColor = getRiskColor(crime.level);
      crimesHtml += `
        <div class="detail__crime">
          <span class="detail__crime-icon">${ct ? ct.icon : '•'}</span>
          <div class="detail__crime-info">
            <div class="detail__crime-name">${ct ? ct.label : key}</div>
            <div class="detail__crime-desc">${crime.desc}</div>
          </div>
          <span class="detail__crime-level" style="background:${cColor}22;color:${cColor}">${getRiskLabel(crime.level)}</span>
        </div>`;
    });

    document.getElementById('zoneDetail').innerHTML = `
      <div class="detail__content">
        <div class="detail__name">Municipio ${id}</div>
        <div class="detail__meta">${name}</div>
        <div class="detail__risk" style="background:${color}18;color:${color}">
          <span class="detail__risk-dot" style="background:${color}"></span>
          Rischio ${activeFilter === 'all' ? 'complessivo' : 'filtrato'}: ${getRiskLabel(risk)}
        </div>
        <div class="detail__crimes">${crimesHtml}</div>
        <div class="detail__tips">
          <div class="detail__tips-title">Consigli</div>
          <p>${data.tips}</p>
        </div>
      </div>`;
  }

  function showHotspotDetail(spot) {
    const color = getRiskColor(spot.risk);
    const mName = MUNICIPI_NAMES[spot.municipio];

    let crimesHtml = spot.crimes.map(key => {
      const ct = CRIME_TYPES.find(c => c.id === key);
      const mData = MUNICIPI_DATA[spot.municipio];
      const crime = mData?.crimes[key];
      const cColor = crime ? getRiskColor(crime.level) : color;
      return `
        <div class="detail__crime">
          <span class="detail__crime-icon">${ct ? ct.icon : '•'}</span>
          <div class="detail__crime-info">
            <div class="detail__crime-name">${ct ? ct.label : key}</div>
            <div class="detail__crime-desc">${crime ? crime.desc : ''}</div>
          </div>
          <span class="detail__crime-level" style="background:${cColor}22;color:${cColor}">${crime ? getRiskLabel(crime.level) : '—'}</span>
        </div>`;
    }).join('');

    document.getElementById('zoneDetail').innerHTML = `
      <div class="detail__content">
        <div class="detail__name">${spot.name}</div>
        <div class="detail__meta">Hotspot · Municipio ${spot.municipio} (${mName})</div>
        <div class="detail__risk" style="background:${color}18;color:${color}">
          <span class="detail__risk-dot" style="background:${color}"></span>
          Rischio: ${getRiskLabel(spot.risk)}
        </div>
        <p style="font-size:0.875rem;color:var(--text-muted);margin-bottom:1rem;line-height:1.45">${spot.desc}</p>
        <div class="detail__crimes">${crimesHtml}</div>
      </div>`;
  }

  function initFilters() {
    const container = document.getElementById('crimeFilters');
    CRIME_TYPES.forEach(ct => {
      const btn = document.createElement('button');
      btn.className = `filter-chip${ct.id === 'all' ? ' filter-chip--active' : ''}`;
      btn.dataset.filter = ct.id;
      btn.innerHTML = `<span class="filter-chip__icon">${ct.icon}</span>${ct.label}`;
      btn.addEventListener('click', () => setFilter(ct.id));
      container.appendChild(btn);
    });
  }

  function setFilter(filter) {
    activeFilter = filter;
    document.querySelectorAll('.filter-chip').forEach(chip => {
      chip.classList.toggle('filter-chip--active', chip.dataset.filter === filter);
    });
    refreshMunicipiStyles();
    if (selectedId) {
      const [type, id] = selectedId.split('-');
      if (type === 'municipio') showMunicipioDetail(Number(id));
      else {
        const spot = HOTSPOTS.find(h => h.id === id);
        if (spot) showHotspotDetail(spot);
      }
    }
  }

  function initLegend() {
    const container = document.getElementById('riskLegend');
    RISK_LEVELS.forEach(r => {
      container.innerHTML += `
        <div class="legend__item">
          <span class="legend__swatch" style="background:${r.color}"></span>
          <span>${r.label}</span>
        </div>`;
    });
  }

  function initStats() {
    const s = CITY_STATS;
    document.getElementById('cityStats').innerHTML = `
      <div class="stat">
        <div class="stat__value">${s.denuncePer100k.toLocaleString('it-IT')}</div>
        <div class="stat__label">Denunce / 100k ab.</div>
      </div>
      <div class="stat">
        <div class="stat__value">${s.posizioneItalia}ª</div>
        <div class="stat__label">In Italia</div>
      </div>
      <div class="stat">
        <div class="stat__value">${s.anno}</div>
        <div class="stat__label">Anno dati</div>
      </div>`;
  }

  function initControls() {
    document.getElementById('btnReset').addEventListener('click', () => {
      map.setView(MILAN_CENTER, DEFAULT_ZOOM, { animate: true });
      selectedId = null;
      refreshMunicipiStyles();
      document.getElementById('zoneDetail').innerHTML = `
        <div class="detail__placeholder">
          <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M24 4C14 4 6 12 6 22c0 14 18 22 18 22s18-8 18-22C42 12 34 4 24 4z"/>
            <circle cx="24" cy="22" r="6"/>
          </svg>
          <p>Clicca su un municipio o su un hotspot per vedere i dettagli sulla criminalità della zona.</p>
        </div>`;
    });

    document.getElementById('btnHotspots').addEventListener('click', function () {
      hotspotsVisible = !hotspotsVisible;
      this.setAttribute('aria-pressed', hotspotsVisible);
      renderHotspots();
    });
  }

  function initMobilePanel() {
    const toggle = document.getElementById('panelToggle');
    const panel = document.getElementById('sidePanel');

    let overlay = document.querySelector('.panel-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'panel-overlay';
      document.querySelector('.main').appendChild(overlay);
    }

    function close() {
      panel.classList.remove('panel--open');
      overlay.classList.remove('panel-overlay--visible');
      toggle.setAttribute('aria-expanded', 'false');
    }

    function open() {
      panel.classList.add('panel--open');
      overlay.classList.add('panel-overlay--visible');
      toggle.setAttribute('aria-expanded', 'true');
    }

    toggle.addEventListener('click', () => {
      panel.classList.contains('panel--open') ? close() : open();
    });
    overlay.addEventListener('click', close);
    window.closePanelOnMobile = close;
  }

  function closePanelOnMobile() {
    if (window.innerWidth <= 900 && window.closePanelOnMobile) {
      window.closePanelOnMobile();
    }
  }

  function hideLoader() {
    document.getElementById('mapLoader').classList.add('map-loader--hidden');
  }

  document.addEventListener('DOMContentLoaded', () => {
    initFilters();
    initLegend();
    initStats();
    initControls();
    initMobilePanel();
    initMap();
  });
})();