export default async function handler(req, res) {
  try {
    const sheetUrl = 'https://opensheet.vercel.app/1mt6eux1eU2jGLvCCofopUuw__kcSl-hu51v6CWBtYCE/Trang%20Tổng';

    const response = await fetch(sheetUrl);
    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Google Sheet response is not an array");
    }

    const videos = data.filter(item => item.uri && item.uri.startsWith("http"));
    res.status(200).json({ videos });
  } catch (error) {
    res.status(500).json({
      error: "Server error",
      detail: error.message,
    });
  }
}
