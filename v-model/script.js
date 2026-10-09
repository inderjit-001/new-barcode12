const L = [
  [0,37,290,"ARP 4754A","Aircraft / System Requirements"],
  [52,148,288,"ARP 4754A","System Architecture & Allocation"],
  [105,258,288,"DO-178C","High-Level SW Requirements (HLR)"],
  [156,368,288,"DO-178C","SW Architecture / Low-Level Reqs"],
  [206,478,306,"DO-254","Detailed Design + HW Development"]
];
const R = [
  [1032,38,288,"CERT","Aircraft Validation<br>& Certification (FAA / EASA)"],
  [980,148,288,"ARP 4754A","System Integration & Verification"],
  [928,258,288,"DO-178C","HW / SW Integration & Qualification"],
  [876,368,288,"DO-178C","Software Integration Testing"],
  [808,478,306,"DO-178C","Unit Testing / LLR Verification (MC/DC)"]
];
const H = 85, boxes = document.getElementById("boxes"), links = document.getElementById("links");
const make = (d, cls) => {
  const b = document.createElement("div");
  b.className = "box " + cls;
  Object.assign(b.style, {left: d[0]+"px", top: d[1]+"px", width: d[2]+"px", height: H+"px"});
  b.innerHTML = `<span class="pill">${d[3]}</span><span>${d[4]}</span>`;
  boxes.appendChild(b);
};
L.forEach((d, i) => {
  make(d, "l");
  make(R[i], "r");
  const a = document.createElement("div");
  a.className = "link";
  const y = d[1] + H / 2, x1 = d[0] + d[2], x2 = R[i][0];
  Object.assign(a.style, {left: x1+"px", width: (x2-x1)+"px", top: y+"px"});
  a.innerHTML = "<span>verifies / traces</span>";
  links.appendChild(a);
});
// scale the fixed 1322x693 stage to the viewport width
const stage = document.getElementById("stage"), wrap = document.getElementById("wrap");
function fit() {
  const s = Math.min(1, wrap.clientWidth / 1322);
  stage.style.transform = `scale(${s})`;
  wrap.style.height = 693 * s + "px";
}
addEventListener("resize", fit); fit();

// smooth V curve through measured points (Catmull-Rom -> cubic Bezier)
const lp = [[133,100],[135,122],[158,232],[205,345],[285,462],[410,565],[476,600],[500,610]];
const rp = lp.slice().reverse().map(p => [1322 - p[0], p[1]]);
const all = lp.concat(rp);
let d = `M${all[0][0]} ${all[0][1]}`;
for (let i = 0; i < all.length - 1; i++) {
  const p0 = all[i-1] || all[i], p1 = all[i], p2 = all[i+1], p3 = all[i+2] || p2;
  d += ` C${p1[0]+(p2[0]-p0[0])/6} ${p1[1]+(p2[1]-p0[1])/6} ${p2[0]-(p3[0]-p1[0])/6} ${p2[1]-(p3[1]-p1[1])/6} ${p2[0]} ${p2[1]}`;
}
document.getElementById("vpath").setAttribute("d", d);
