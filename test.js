var geo = 
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "letter": "G",
                "color": "blue",
                "rank": "7",
                "ascii": "71"
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [123.61, -22.14], [123.61, -21.14],[124.61, -21.14],[124.61, -22.14],[123.61, -22.14]
                    ]
                ]
            }
        },
    ]
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// create a new cell in grid
let new_cell = function(size, coordinates, axis) {
    cell = []

    // create a cell by one coordinate which is left-bottom
    // its size is based on argument: size
    // in this case, axis is useless
    if (coordinates.length === 2) {
        cell.push([coordinates[0], coordinates[1]])
        cell.push([coordinates[0], coordinates[1] + size])
        cell.push([coordinates[0] + size, coordinates[1] + size])
        cell.push([coordinates[0] + size, coordinates[1]])
        cell.push([coordinates[0], coordinates[1]])

        return cell
    }

    // create a cell by another cell
    if (axis === 0) {
        for (let j=0; j < coordinates.length; j++) {
            cell.push([coordinates[j][0] + size, coordinates[j][1]])
        }
    } else if (axis === 1) {
        for (let j=0; j < coordinates.length; j++) {
            cell.push([coordinates[j][0], coordinates[j][1] + size])
        }
    }
    return cell
}

let new_feature = function(coordinates, axis) {
    let cell = new_cell(1, coordinates, axis)
    return {
        "type": "Feature",
        "properties": {
            "letter": "G",
            // "color": "blue",
            "color": getRandomColor(),
            "rank": "7",
            "ascii": "71"
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                cell
            ]
        }
    }
}

// geo.features[0].geometry.coordinates[0] = new_cell(1,[123.61, -22.14])
geo.features[0].geometry.coordinates[0] = new_cell(1,[43.04, -76.14])

for (let i=1; i < 32; i++) {
    let cell = geo.features[i-1].geometry.coordinates[0]
    let feature = new_feature(cell, axis=0)
    geo.features.push(feature)
}

// for (let i=0; i < 32; i++) {
//     let cell = geo.features[i].geometry.coordinates[0]
//     let new_cell = new_feature(cell, axis=1)
//     geo.features.push(new_cell)
// }

for (let j=0; j < 32; j++) {
    let i = j*32
    let k = (j+1)*32
    for (; i < k; i++) {
        let cell = geo.features[i].geometry.coordinates[0]
        let feature = new_feature(cell, axis=1)
        geo.features.push(feature)
    }
}


// console.log(new_cell(1,[123.61, -22.14]))
// console.log(new_cell(0.1,[123.61, -22.14]))

// console.log(geo.features[0].geometry.coordinates[0])
// console.log(new_cell(1,[123.61, -22.14]))