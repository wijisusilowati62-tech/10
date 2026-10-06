/* =========================================================================
   VIRTUAL LAB: LISTRIK ARUS SEARAH (DC) - P5.JS SKETCH (CERIA & RAMAH MATA)
   Format: p5.js Standalone Editor (https://editor.p5js.org/)
   Proyek Mata Kuliah SAINS KOMPUTASI
   
   Fitur Utama:
   1. Tampilan Ceria & Ramah Mata dengan Palet Full Color Kekinian.
   2. Pembatasan Bingkai Ketinggian/Lebar (Bounding Canvas Box) Rapi.
   3. 5 Modul Eksperimen Listrik DC Interaktif Berbasis Deep Learning.
   ========================================================================= */

// State Layar Utama: 'COVER' atau 'LAB'
let currentScreen = 'COVER';

// Sub-materi aktif di dalam modul LAB (1 - 5)
let activeTab = 1;

// Identitas Penyusun & Kurikulum
const infoPenyusun = {
  judul: "VIRTUAL LAB LISTRIK ARUS SEARAH (DC)",
  subJudul: "Fisika SMA Kelas XII",
  nama: "Adinda Amelia - Rizki Syahfina B. - Wiji Susilowati",
  instansi: "Kelas RPL",
  tahun: "2026"
};

// Offset Animasi Aliran Elektron & Particle Sparkle
let animOffset = 0;
let bgParticles = [];

// Parameter Fisika Simulasi
let physics = {
  // Tab 1: Hukum Ohm
  voltage: 12.0,       // Volt (1V - 24V)
  resistance: 10.0,    // Ohm (1Ω - 50Ω)
  
  // Tab 2: Hambatan Jenis Kawat (R = ρ * L / A)
  materialRho: 1.68e-8, // Tembaga (Ω·m)
  materialName: "Tembaga",
  wireLength: 50.0,    // Meter (5m - 200m)
  wireArea: 2.0,       // mm² (0.5mm² - 10mm²)
  temperature: 25.0,   // °C (0°C - 100°C)

  // Tab 3: Rangkaian Seri & Paralel
  circuitType: 'SERI', // 'SERI' atau 'PARALEL'
  r1: 10.0,
  r2: 10.0,
  sw1: true,
  sw2: true,

  // Tab 4: Hukum II Kirchhoff
  v1: 12.0,
  v2: 6.0,
  rk1: 10.0,
  rk2: 20.0,

  // Tab 5: Daya & Energi Listrik
  powerDeviceWatts: 100,
  hoursPerDay: 8
};

// UI Slider Interaktif
let slider1, slider2, slider3;


function setup() {
  createCanvas(800, 600);
  textFont('sans-serif');
  
  // Generasi Partikel Dekoratif Latar Belakang (Proton & Elektron Ceria)
  for (let i = 0; i < 25; i++) {
    bgParticles.push({
      x: random(20, width - 20),
      y: random(20, height - 20),
      size: random(6, 14),
      vx: random(-0.5, 0.5),
      vy: random(-0.5, 0.5),
      type: random() > 0.5 ? '+' : '-',
      color: random() > 0.5 ? color(255, 99, 132, 120) : color(6, 182, 212, 120)
    });
  }

  // Inisialisasi Slider DOM p5.js
  createUISliders();
}

function draw() {
  // Latar Belakang Cerah & Ramah Mata (Soft Sky Cream/Pastel)
  background(248, 250, 252);

  // Animasi Partikel Dekoratif Latar Belakang
  updateAndDrawParticles();

  // Manajemen Tampilan Layar Utama
  if (currentScreen === 'COVER') {
    hideUISliders();
    drawCoverScreen();
  } else if (currentScreen === 'LAB') {
    updateUISlidersVisibility();
    drawLabScreen();
  }

  // Update Waktu Animasi Elektron
  animOffset += 2.0;
}

function updateAndDrawParticles() {
  push();
  noStroke();
  for (let p of bgParticles) {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 10 || p.x > width - 10) p.vx *= -1;
    if (p.y < 10 || p.y > height - 10) p.vy *= -1;

    fill(p.color);
    ellipse(p.x, p.y, p.size);
    fill(255, 200);
    textSize(p.size * 0.7);
    textAlign(CENTER, CENTER);
    text(p.type, p.x, p.y);
  }
  pop();
}


function drawCoverScreen() {
  push();
  
  // 1. Bingkai Pembatas Canvas Ceria (Turquoise & Pink Accent)
  stroke(6, 182, 212);
  strokeWeight(4);
  fill(255, 255, 255, 220);
  rect(12, 12, width - 24, height - 24, 20);

  // Inner Pink Border
  stroke(244, 63, 94, 150);
  strokeWeight(2);
  noFill();
  rect(18, 18, width - 36, height - 36, 16);

  // 2. Banner Utama Header (Pink Cerah Gradient Feel)
  fill(244, 63, 94); // Vibrant Bright Pink
  noStroke();
  rect(45, 45, width - 90, 180, 20);

  // Aksesori Lengkung Kuning
  fill(251, 191, 36);
  ellipse(75, 75, 40, 40);
  ellipse(width - 75, 75, 30, 30);

  // Judul Program
  textAlign(CENTER, CENTER);
  fill(255);
  textSize(22);
  textStyle(BOLD);
  text(`⚡ ${infoPenyusun.judul} ⚡`, width / 2, 90);

  // Sub-Judul
  fill(254, 243, 199); // Light Yellow
  textSize(13);
  textStyle(NORMAL);
  text(infoPenyusun.subJudul, width / 2, 125);

  // Badge Kurikulum Merdeka & Pusdatin
  fill(16, 185, 129); // Vibrant Turquoise Green
  rect(width / 2 - 160, 155, 320, 32, 16);
  fill(255);
  textSize(11);
  textStyle(BOLD);
  text("Tugas Proyek • SAINS KOMPUTASI", width / 2, 171);

  // 3. Modul Informasi Penyusun (Kartu Toska Cerah)
  fill(240, 253, 250);
  stroke(20, 184, 166);
  strokeWeight(2);
  rect(45, 245, width - 90, 180, 20);

  fill(13, 148, 136);
  noStroke();
  textSize(12);
  textStyle(BOLD);
  text("DISUSUN OLEH KELOMPOK 10:", width / 2, 275);

  fill(15, 23, 42);
  textSize(17);
  textStyle(BOLD);
  text(infoPenyusun.nama, width / 2, 305);

  fill(71, 85, 105);
  textSize(13);
  textStyle(NORMAL);
  text(infoPenyusun.instansi + " • " + infoPenyusun.tahun, width / 2, 335);

  // Formula Banner Hiasan
  fill(249, 115, 22); // Vibrant Orange
  rect(width / 2 - 180, 365, 360, 30, 15);
  fill(255);
  textSize(12);
  textStyle(BOLD);
  text("💡 V = I × R   |   P = V × I   |   R = ρ · L / A 💡", width / 2, 380);

  // 4. Tombol Interaktif "MULAI SIMULASI" (Kuning Emas & Orange Glow)
  let btnX = width / 2 - 120;
  let btnY = 460;
  let btnW = 240;
  let btnH = 55;

  let isHover = mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH;
  
  if (isHover) {
    fill(245, 158, 11); // Darker Amber
    stroke(244, 63, 94);
    strokeWeight(3);
    cursor(HAND);
  } else {
    fill(251, 191, 36); // Sunny Yellow
    stroke(249, 115, 22);
    strokeWeight(2);
    cursor(ARROW);
  }

  rect(btnX, btnY, btnW, btnH, 18);

  fill(15, 23, 42);
  noStroke();
  textSize(15);
  textStyle(BOLD);
  text("🚀 MULAI SIMULASI LAB  ➔", width / 2, btnY + 27);

  pop();
}


function drawLabScreen() {
  push();

  // Bingkai Utama Lab (Soft White dengan Border Toska)
  fill(255);
  stroke(14, 165, 233);
  strokeWeight(3);
  rect(8, 8, width - 16, height - 16, 16);

  // Top Bar Navigation
  drawHeaderNavigation();

  // Render Sub-Materi Sesuai Tab Aktif
  switch (activeTab) {
    case 1: drawTabHukumOhm(); break;
    case 2: drawTabHambatanKawat(); break;
    case 3: drawTabRangkaianSeriParalel(); break;
    case 4: drawTabHukumKirchhoff(); break;
    case 5: drawTabDayaListrik(); break;
  }

  // Footer Sensor Realtime
  drawLiveReadingsFooter();

  pop();
}

function drawHeaderNavigation() {
  push();
  // Header Background Bar (Pastel Toska)
  fill(224, 242, 254);
  noStroke();
  rect(14, 14, width - 28, 52, 12);

  // Tombol Kembali "COVER"
  let isBackHover = mouseX > 22 && mouseX < 105 && mouseY > 22 && mouseY < 58;
  fill(isBackHover ? color(225, 29, 72) : color(244, 63, 94));
  rect(22, 22, 85, 36, 10);
  fill(255);
  textSize(10);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("🏠 COVER", 64, 40);

  // Tab Navigasi (5 Warna Ceria Khas Siswa)
  const tabTitles = ["1. Hukum Ohm", "2. Kawat", "3. Seri/Paralel", "4. Kirchhoff", "5. Daya & CO₂"];
  const tabColors = [
    color(236, 72, 153),  // Pink
    color(14, 165, 233),  // Sky Blue/Toska
    color(249, 115, 22),  // Orange
    color(139, 92, 246),  // Purple
    color(16, 185, 129)   // Green
  ];

  let startX = 115;
  let tabW = 128;

  for (let i = 0; i < tabTitles.length; i++) {
    let tx = startX + i * (tabW + 5);
    let ty = 22;
    let isActive = (activeTab === (i + 1));
    let isHover = mouseX > tx && mouseX < tx + tabW && mouseY > ty && mouseY < ty + 36;

    if (isActive) {
      fill(tabColors[i]);
      stroke(251, 191, 36);
      strokeWeight(2.5);
    } else if (isHover) {
      fill(254, 240, 138); // Yellow Soft Hover
      stroke(tabColors[i]);
      strokeWeight(1.5);
    } else {
      fill(255);
      stroke(203, 213, 225);
      strokeWeight(1);
    }

    rect(tx, ty, tabW, 36, 10);

    fill(isActive ? 255 : 30);
    noStroke();
    textSize(10);
    textStyle(BOLD);
    text(tabTitles[i], tx + tabW / 2, ty + 18);
  }
  pop();
}


function drawTabHukumOhm() {
  push();
  physics.voltage = slider1.value();
  physics.resistance = slider2.value();
  let I = physics.voltage / physics.resistance;

  // Panel Kontrol Parameter (Kartu Pink Pastels)
  fill(253, 242, 248);
  stroke(236, 72, 153);
  strokeWeight(2);
  rect(25, 75, 230, 100, 12);

  fill(190, 24, 93); noStroke(); textSize(12); textStyle(BOLD); textAlign(LEFT, CENTER);
  text(`⚡ Tegangan (V): ${physics.voltage.toFixed(1)} Volt`, 35, 100);
  text(`🔘 Hambatan (R): ${physics.resistance.toFixed(1)} Ohm`, 35, 140);

  // Rangkaian Listrik Visual (Biru Toska Wire)
  let cLeft = 80, cRight = 480, cTop = 200, cBottom = 390;

  stroke(14, 165, 233); strokeWeight(5); noFill();
  rect(cLeft, cTop, cRight - cLeft, cBottom - cTop, 16);

  // Baterai, Resistor, dan Amperemeter
  drawBatteryIcon(cLeft, (cTop + cBottom) / 2, physics.voltage);
  drawResistorIcon((cLeft + cRight) / 2, cTop, physics.resistance);
  drawAmmeterIcon(cRight, (cTop + cBottom) / 2, I);

  // Aliran Elektron Bergerak
  if (I > 0.01) {
    drawElectronFlow(cLeft, cRight, cTop, cBottom, I);
  }

  // Grafik Realtime V vs I (Kanan)
  drawGraphVvsI(515, 75, 260, 315, physics.voltage, I);

  pop();
}

function drawTabHambatanKawat() {
  push();
  physics.wireLength = slider1.value();
  physics.wireArea = slider2.value();
  physics.temperature = slider3.value();

  let rhoT = physics.materialRho * (1 + 0.00386 * (physics.temperature - 20));
  let R = (rhoT * physics.wireLength) / (physics.wireArea * 1e-6);

  // Panel Kontrol (Kartu Biru Toska)
  fill(240, 249, 255);
  stroke(14, 165, 233);
  strokeWeight(2);
  rect(25, 75, 240, 130, 12);

  fill(3, 105, 161); noStroke(); textSize(12); textStyle(BOLD); textAlign(LEFT, CENTER);
  text(`📏 Panjang (L): ${physics.wireLength} m`, 35, 98);
  text(`📐 Luas Area (A): ${physics.wireArea.toFixed(1)} mm²`, 35, 138);
  text(`🌡️ Suhu Kawat (T): ${physics.temperature} °C`, 35, 178);

  // Visual Kawat Penghantar (Orange Cerah)
  let wX = 300, wY = 200;
  let wLenPixel = map(physics.wireLength, 5, 200, 80, 420);
  let wThickPixel = map(physics.wireArea, 0.5, 10, 12, 55);

  fill(251, 146, 60);
  stroke(234, 88, 12);
  strokeWeight(2);
  rect(wX, wY - wThickPixel / 2, wLenPixel, wThickPixel, wThickPixel / 4);

  // Getaran Atom Suhu (Pink Pulsating Dots)
  fill(244, 63, 94); noStroke();
  let vib = map(physics.temperature, 0, 100, 0.5, 4.5);
  for (let x = wX + 15; x < wX + wLenPixel - 10; x += 22) {
    for (let y = wY - wThickPixel / 2 + 6; y <= wY + wThickPixel / 2 - 6; y += 12) {
      let vx = sin(frameCount * 0.2 + x) * vib;
      let vy = cos(frameCount * 0.2 + y) * vib;
      ellipse(x + vx, y + vy, 6, 6);
    }
  }

  // Card Hasil Hambatan
  fill(254, 243, 199); stroke(245, 158, 11); strokeWeight(2);
  rect(300, 305, 460, 85, 14);
  fill(180, 83, 9); noStroke(); textSize(16); textAlign(CENTER, CENTER); textStyle(BOLD);
  text(`HAMBATAN KAWAT (R) = ${R.toFixed(4)} Ω`, 530, 347);

  pop();
}

function drawTabRangkaianSeriParalel() {
  push();
  physics.v1 = slider1.value();

  // Toggle Mode Seri / Paralel Button
  let modeBtnX = 25, modeBtnY = 75, modeBtnW = 230, modeBtnH = 40;
  fill(physics.circuitType === 'SERI' ? color(249, 115, 22) : color(16, 185, 129));
  stroke(251, 191, 36); strokeWeight(2);
  rect(modeBtnX, modeBtnY, modeBtnW, modeBtnH, 10);
  fill(255); noStroke(); textSize(12); textStyle(BOLD); textAlign(CENTER, CENTER);
  text(`MODE: RANGKAIAN ${physics.circuitType} 🔄`, modeBtnX + modeBtnW / 2, modeBtnY + modeBtnH / 2);

  fill(15, 23, 42); textAlign(LEFT, CENTER); textSize(12); textStyle(BOLD);
  text(`⚡ Tegangan Sumber: ${physics.v1.toFixed(1)} V`, 25, 140);

  // Skema Rangkaian
  let left = 290, right = 740, top = 120, bottom = 380;
  stroke(14, 165, 233); strokeWeight(5); noFill();

  if (physics.circuitType === 'SERI') {
    rect(left, top, right - left, bottom - top, 16);
    drawBatteryIcon(left, (top + bottom) / 2, physics.v1);
    drawLampuIcon(left + 140, top, "Lampu 1", true);
    drawLampuIcon(left + 300, top, "Lampu 2", true);
  } else {
    rect(left, top, right - left, bottom - top, 16);
    line(left + 220, top, left + 220, bottom);
    drawBatteryIcon(left, (top + bottom) / 2, physics.v1);
    drawLampuIcon(left + 110, top, "Lampu 1 (Cabang 1)", true);
    drawLampuIcon(left + 330, top, "Lampu 2 (Cabang 2)", true);
  }

  pop();
}

function drawTabHukumKirchhoff() {
  push();
  physics.v1 = slider1.value();
  physics.v2 = slider2.value();

  // Kartu Kontrol Dual Loop
  fill(243, 232, 255);
  stroke(139, 92, 246);
  strokeWeight(2);
  rect(25, 75, 230, 100, 12);

  fill(109, 40, 217); noStroke(); textSize(12); textStyle(BOLD); textAlign(LEFT, CENTER);
  text(`🔋 Baterai E1 (Loop 1): ${physics.v1.toFixed(1)} V`, 35, 100);
  text(`🔋 Baterai E2 (Loop 2): ${physics.v2.toFixed(1)} V`, 35, 140);

  // Rangkaian Dual Loop
  let left = 280, mid = 510, right = 740;
  let top = 110, bottom = 380;

  stroke(139, 92, 246); strokeWeight(4); noFill();
  rect(left, top, mid - left, bottom - top, 12);
  rect(mid, top, right - mid, bottom - top, 12);

  drawBatteryIcon(left, (top + bottom) / 2, physics.v1);
  drawBatteryIcon(right, (top + bottom) / 2, physics.v2);

  // Simpul Persimpangan Junction (Pink Nodes)
  fill(244, 63, 94); noStroke();
  ellipse(mid, top, 16, 16);
  ellipse(mid, bottom, 16, 16);
  fill(15, 23, 42); textSize(11); textStyle(BOLD); textAlign(CENTER);
  text("📍 Simpul A", mid, top - 14);
  text("📍 Simpul B", mid, bottom + 18);

  pop();
}

function drawTabDayaListrik() {
  push();
  physics.powerDeviceWatts = slider1.value();
  physics.hoursPerDay = slider2.value();

  let dailyKWh = (physics.powerDeviceWatts * physics.hoursPerDay) / 1000;
  let monthlyCost = dailyKWh * 30 * 1444.70;
  let monthlyCO2 = dailyKWh * 30 * 0.85;

  // Panel Kontrol Input
  fill(236, 253, 245);
  stroke(16, 185, 129);
  strokeWeight(2);
  rect(25, 75, 240, 100, 12);

  fill(4, 120, 87); noStroke(); textSize(12); textStyle(BOLD); textAlign(LEFT, CENTER);
  text(`💡 Daya Alat: ${physics.powerDeviceWatts} Watt`, 35, 100);
  text(`⏰ Durasi Pakai: ${physics.hoursPerDay} Jam/Hari`, 35, 140);

  // Card Smart Meter Green Eco
  fill(255); stroke(16, 185, 129); strokeWeight(3);
  rect(295, 80, 465, 305, 20);

  fill(16, 185, 129); noStroke();
  rect(295, 80, 465, 45, 20);
  fill(255); textSize(15); textStyle(BOLD); textAlign(CENTER, CENTER);
  text("🌱 SMART METER & AUDIT ENERGI HIJAU 🌱", 527, 102);

  fill(14, 165, 233); textSize(22); textStyle(BOLD);
  text(`⚡ ${dailyKWh.toFixed(2)} kWh / Hari`, 527, 160);

  fill(16, 185, 129); textSize(15);
  text(`💰 Estimasi Tagihan: Rp ${monthlyCost.toLocaleString('id-ID')}/Bulan`, 527, 215);

  fill(244, 63, 94); textSize(14);
  text(`🌍 Jejak Karbon (CO₂): ~${monthlyCO2.toFixed(1)} kg / Bulan`, 527, 265);

  pop();
}


function drawBatteryIcon(x, y, val) {
  push(); translate(x, y);
  fill(251, 191, 36); stroke(15, 23, 42); strokeWeight(2.5);
  rect(-16, -26, 32, 52, 8);
  fill(244, 63, 94); rect(-8, -32, 16, 6, 3);
  fill(15, 23, 42); noStroke(); textAlign(CENTER, CENTER); textSize(11); textStyle(BOLD);
  text(`${val.toFixed(1)}V`, 0, 0);
  pop();
}

function drawResistorIcon(x, y, val) {
  push(); translate(x, y);
  fill(236, 72, 153); stroke(15, 23, 42); strokeWeight(2.5);
  rect(-32, -16, 64, 32, 8);
  fill(255); noStroke(); textAlign(CENTER, CENTER); textSize(11); textStyle(BOLD);
  text(`${val.toFixed(1)}Ω`, 0, 0);
  pop();
}

function drawAmmeterIcon(x, y, val) {
  push(); translate(x, y);
  fill(254, 240, 138); stroke(249, 115, 22); strokeWeight(3);
  ellipse(0, 0, 44, 44);
  fill(15, 23, 42); noStroke(); textAlign(CENTER, CENTER); textSize(11); textStyle(BOLD);
  text(`${val.toFixed(2)}A`, 0, 0);
  pop();
}

function drawLampuIcon(x, y, label, isOn) {
  push(); translate(x, y);
  if (isOn) {
    fill(251, 191, 36, 180); noStroke(); ellipse(0, 0, 42, 42);
  }
  fill(255); stroke(245, 158, 11); strokeWeight(2.5); ellipse(0, 0, 26, 26);
  fill(15, 23, 42); noStroke(); textSize(10); textStyle(BOLD); textAlign(CENTER); text(label, 0, -24);
  pop();
}

function drawElectronFlow(left, right, top, bottom, iVal) {
  push();
  fill(251, 191, 36); stroke(249, 115, 22); strokeWeight(1);
  let speed = constrain(iVal * 2.5, 0.8, 9);
  let totalLen = 2 * (right - left) + 2 * (bottom - top);

  for (let d = 0; d < totalLen; d += 24) {
    let pos = (d + animOffset * speed) % totalLen;
    let x, y;
    if (pos < (right - left)) { x = left + pos; y = top; }
    else if (pos < (right - left) + (bottom - top)) { x = right; y = top + (pos - (right - left)); }
    else if (pos < 2 * (right - left) + (bottom - top)) { x = right - (pos - (right - left) - (bottom - top)); y = bottom; }
    else { x = left; y = bottom - (pos - 2 * (right - left) - (bottom - top)); }
    ellipse(x, y, 8, 8);
  }
  pop();
}

function drawGraphVvsI(gx, gy, gw, gh, vVal, iVal) {
  push(); translate(gx, gy);
  fill(255); stroke(14, 165, 233); strokeWeight(2);
  rect(0, 0, gw, gh, 14);

  // Sumbu Grafik
  stroke(148, 163, 184); strokeWeight(1.5);
  line(30, gh - 25, gw - 20, gh - 25); // Sumbu V
  line(30, gh - 25, 30, 25);         // Sumbu I

  fill(100, 116, 139); noStroke(); textSize(10); textStyle(BOLD);
  text("V (Volt)", gw - 35, gh - 10); text("I (Ampere)", 10, 18);

  // Garis Linier
  stroke(236, 72, 153); strokeWeight(3);
  line(30, gh - 25, gw - 25, 30);

  // Titik Plot Posisi
  let px = map(vVal, 1, 24, 30, gw - 25);
  let py = map(iVal, 0.02, 2.4, gh - 25, 30);
  fill(251, 191, 36); stroke(239, 68, 68); strokeWeight(2);
  ellipse(px, py, 12, 12);
  pop();
}

function drawLiveReadingsFooter() {
  push();
  fill(241, 245, 249); stroke(203, 213, 225); strokeWeight(2);
  rect(14, 465, width - 28, 120, 14);

  fill(244, 63, 94); noStroke(); textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
  text("📊 MONITOR SENSOR DEEP LEARNING (REALTIME)", 28, 480);

  fill(71, 85, 105); textSize(11); textStyle(NORMAL);
  text("Geser parameter slider untuk mengeksplorasi hubungan antar besaran fisika. Pelajari bagaimana perubahan tegangan & hambatan mempengaruhi arus!", 28, 502);

  // Status Chip Online
  fill(16, 185, 129); rect(width - 150, 478, 120, 24, 12);
  fill(255); textSize(10); textStyle(BOLD); textAlign(CENTER, CENTER); text("SYSTEM READY  ✅", width - 90, 490);
  pop();
}


function createUISliders() {
  slider1 = createSlider(1, 24, 12, 0.5);
  slider1.position(35, 115);
  slider1.style('width', '180px');

  slider2 = createSlider(1, 50, 10, 1);
  slider2.position(35, 155);
  slider2.style('width', '180px');

  slider3 = createSlider(0, 100, 25, 1);
  slider3.position(35, 195);
  slider3.style('width', '180px');
}

function hideUISliders() {
  slider1.hide();
  slider2.hide();
  slider3.hide();
}

function updateUISlidersVisibility() {
  if (activeTab === 1) {
    slider1.show(); slider2.show(); slider3.hide();
  } else if (activeTab === 2) {
    slider1.show(); slider2.show(); slider3.show();
  } else if (activeTab === 3) {
    slider1.show(); slider2.hide(); slider3.hide();
  } else if (activeTab === 4) {
    slider1.show(); slider2.show(); slider3.hide();
  } else if (activeTab === 5) {
    slider1.show(); slider2.show(); slider3.hide();
  }
}

function mousePressed() {
  if (currentScreen === 'COVER') {
    let btnX = width / 2 - 120;
    let btnY = 460;
    if (mouseX > btnX && mouseX < btnX + 240 && mouseY > btnY && mouseY < btnY + 55) {
      currentScreen = 'LAB';
    }
  } 
  else if (currentScreen === 'LAB') {
    // Tombol Kembali
    if (mouseX > 22 && mouseX < 107 && mouseY > 22 && mouseY < 58) {
      currentScreen = 'COVER';
    }

    // Navigasi 5 Tab
    let startX = 115;
    let tabW = 128;
    for (let i = 0; i < 5; i++) {
      let tx = startX + i * (tabW + 5);
      if (mouseX > tx && mouseX < tx + tabW && mouseY > 22 && mouseY < 58) {
        activeTab = i + 1;
      }
    }

    // Toggle Seri / Paralel
    if (activeTab === 3 && mouseX > 25 && mouseX < 255 && mouseY > 75 && mouseY < 115) {
      physics.circuitType = (physics.circuitType === 'SERI') ? 'PARALEL' : 'SERI';
    }
  }
}