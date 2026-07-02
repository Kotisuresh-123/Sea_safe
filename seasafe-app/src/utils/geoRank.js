export function rankLocations(results) {
  return results
    .map((r) => {
      let score = Number(r.importance || 0);

      if (r.class === "waterway") score += 10;
      if (r.type === "river") score += 8;
      if (r.type === "sea") score += 8;
      if (r.type === "ocean") score += 8;
      if (r.type === "bay") score += 6;

      return { ...r, score };
    })
    .sort((a, b) => b.score - a.score);
}