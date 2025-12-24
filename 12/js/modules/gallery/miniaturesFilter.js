function filterTenRandomPhotos(photosArray) {
  return [...photosArray].sort(() => Math.random() - 0.5).slice(0, 10);
}

function filterMostDiscussedPhotos(photosArray) {
  return photosArray.slice().sort((a, b) => b.comments.length - a.comments.length);
}

export { filterTenRandomPhotos, filterMostDiscussedPhotos };
