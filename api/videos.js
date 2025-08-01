import axios from 'axios';

let cacheData = null;
let cacheTime = 0;

export default async function handler(req, res) {
  const now = Date.now();
  const CACHE_DURATION = 5 * 60 * 1000;

  if (cacheData && now - cacheTime < CACHE_DURATION) {
    return res.status(200).json(cacheData);
  }

  try {
    const SHEET_URL = 'https://opensheet.vercel.app/1mt6eux1eU2jGLvCCofopUuw__kcSl-hu51v6CWBtYCE/Trang%201';
    const response = await axios.get(SHEET_URL);

    const videos = response.data
      .filter((item) => item.uri && item.uri.startsWith('http'))
      .map((item, index) => ({
        id: item.id || `video${index}`,
        title: item.title || `Tập ${index + 1}`,
        uri: item.uri,
      }));

    cacheData = videos;
    cacheTime = now;

    return res.status(200).json(videos);
  } catch (error) {
    return res.status(500).json({ error: 'Không thể lấy dữ liệu từ Google Sheets' });
  }
}
