export async function findNearestCoast(lat, lon) {

    const radius = 300;

    const url =
`https://nominatim.openstreetmap.org/search?` +
`format=jsonv2` +
`&q=beach` +
`&limit=10` +
`&accept-language=en`;

    const res = await fetch(url);

    const beaches = await res.json();

    return beaches;
}