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

var create_cell = function(coordinates, axis) {
    let new_cell = []
    if (axis === 0) {
        for (let j=0; j < coordinates.length; j++) {
            new_cell.push([coordinates[j][0]+1, coordinates[j][1]])
        }
    } else if (axis === 1) {
        for (let j=0; j < coordinates.length; j++) {
            new_cell.push([coordinates[j][0], coordinates[j][1]+1])
        }
    }
    // console.log(coordinates)
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
                new_cell
            ]
        }
    }
}


for (let i=1; i < 32; i++) {
    let cell = geo.features[i-1].geometry.coordinates[0]
    let new_cell = create_cell(cell, axis=0)
    geo.features.push(new_cell)
}

// for (let i=0; i < 32; i++) {
//     let cell = geo.features[i].geometry.coordinates[0]
//     let new_cell = create_cell(cell, axis=1)
//     geo.features.push(new_cell)
// }

for (let j=0; j < 32; j++) {
    let i = j*32
    let k = (j+1)*32
    for (; i < k; i++) {
        let cell = geo.features[i].geometry.coordinates[0]
        let new_cell = create_cell(cell, axis=1)
        geo.features.push(new_cell)
    }
}

  