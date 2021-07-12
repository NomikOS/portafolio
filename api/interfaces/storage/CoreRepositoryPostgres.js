export default class CoreRepositoryPostgres {
  constructor({ coreDb }) {
    this.coreDb = coreDb
  }

  poisAll() {
    return this.coreDb("pois")
  }

  poisFilter(coords, distance) {
    const sql = `
    SELECT *
    FROM pois
    WHERE ST_DWithin(pois.point, ST_MakePoint(:long, :lat)::geography, :distance)
    ORDER BY pois.point <-> ST_MakePoint(:long, :lat)::geometry;
    `
    return this.coreDb
      .raw(sql, { lat: coords.latitude, long: coords.longitude, distance })
      .then((r) => {
        return r.rowCount ? r.rows : []
      })
  }

  poisFilterCat(coords, distance, catId) {
    const sql = `
    SELECT *
    FROM pois
    WHERE ST_DWithin(pois.point, ST_MakePoint(:long, :lat)::geography, :distance)
    AND category_id = ANY(:catId)
    ORDER BY pois.point <-> ST_MakePoint(:long, :lat)::geometry;
    `
    return this.coreDb
      .raw(sql, {
        lat: coords.latitude,
        long: coords.longitude,
        distance,
        catId,
      })
      .then((r) => {
        return r.rowCount ? r.rows : []
      })
  }
}
