const urls = [
  '/',
  '/gioi-thieu',
  '/lien-he',
  '/gio-hang',
  '/dich-vu',
  '/dich-vu/tu-vi',
  '/dich-vu/bat-tu',
  '/dich-vu/scan-face',
  '/dich-vu/scan-palm',
  '/dich-vu/xem-van-tay',
  '/dich-vu/tarot',
  '/dich-vu/kinh-dich',
  '/dich-vu/xin-xam',
  '/dich-vu/la-ban',
  '/dich-vu/thuoc-lo-ban',
  '/dich-vu/bat-trach',
  '/dich-vu/than-so-hoc',
  '/dich-vu/cham-diem-sim',
  '/dich-vu/lich-van-nien',
  '/cua-hang',
  '/cua-hang/bai-tam-linh',
  '/cua-hang/phu-kien-tam-linh',
  '/cua-hang/huong-tram',
  '/cua-hang/tra-dao',
  '/cua-hang/do-tho-cung',
  '/cua-hang/bo-suu-tap-cao-cap',
  '/cua-hang/set-qua-tang',
  '/hoc-vien',
  '/hoc-vien-huyen-hoc',
  '/hoc-vien/menh',
  '/hoc-vien/tuong',
  '/hoc-vien/boc',
  '/hoc-vien/trach',
  '/hoc-vien/so',
  '/hoc-vien/thi-chung-chi',
  '/tai-khoan',
  '/tai-khoan/ho-so-cap-do',
  '/tai-khoan/vi-linh-te',
  '/tai-khoan/bao-mat-2fa',
  '/tai-khoan/hop-thu',
  '/tai-khoan/nhiem-vu',
  '/tai-khoan/ho-so-nguoi-than'
];

async function checkAll() {
  console.log("Bắt đầu kiểm tra " + urls.length + " links trên Menu...");
  let errors = 0;
  for (const u of urls) {
    try {
      const res = await fetch("http://localhost:3000" + u);
      if (res.status === 200) {
        console.log(`[PASS 200] ${u}`);
      } else {
        console.error(`[FAIL ${res.status}] ${u}`);
        errors++;
      }
    } catch (e) {
      console.error(`[ERR] ${u} -> ${e.message}`);
      errors++;
    }
  }
  console.log(`\n=> Kết quả: ${urls.length - errors}/${urls.length} links hoạt động tốt 100%!`);
}

checkAll();
