export function filterDataByKeyword(data, keyword) {
     // if (!Array.isArray(data)) return [];
  return data.filter(item =>
    item.name.toLowerCase().includes(keyword.toLowerCase()) 
    // item.description.toLowerCase().includes(keyword.toLowerCase())
  );
}
