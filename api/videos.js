export default async function handler(req, res) {
  try {
    const response = await fetch("https://opensheet.elk.sh/1mt6eux1eU2jGLvCCofopUuw__kcSl-hu51v6CWBtYCE/Trang%20Tổng");
    const data = await response.json();

    // ✅ Kiểm tra chắc chắn là array
    if (!Array.isArray(data)) {
      throw new Error("Data from Google Sheet is not an array");
    }

    // ✅ Lọc các video hợp lệ
    const videos = data.filter((item) => item.uri && item.uri.startsWith("http"));
    res.status(200).json({ videos });
  } catch (error) {
    res.status(500).json({
      error: "Server error",
      detail: error.message,
    });
  }
}
