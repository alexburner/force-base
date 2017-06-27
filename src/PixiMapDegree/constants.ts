import * as d3_scale from 'd3-scale'
import * as d3_scale_chromatic from 'd3-scale-chromatic'

export const D3Colors = {
    Viridis: {
        name: 'Viridis',
        interpolator: d3_scale.interpolateViridis,
        domain: [0, 1],
    },
    Inferno: {
        name: 'Inferno',
        interpolator: d3_scale.interpolateInferno,
        domain: [0, 1],
    },
    Magma: {
        name: 'Magma',
        interpolator: d3_scale.interpolateMagma,
        domain: [0, 1],
    },
    Blues: {
        name: 'Blues',
        interpolator: d3_scale_chromatic.interpolateBlues,
        domain: [1, 0],
    },
    Greens: {
        name: 'Greens',
        interpolator: d3_scale_chromatic.interpolateGreens,
        domain: [1, 0],
    },
    Greys: {
        name: 'Greys',
        interpolator: d3_scale_chromatic.interpolateGreys,
        domain: [1, 0],
    },
    Oranges: {
        name: 'Oranges',
        interpolator: d3_scale_chromatic.interpolateOranges,
        domain: [1, 0],
    },
    Purples: {
        name: 'Purples',
        interpolator: d3_scale_chromatic.interpolatePurples,
        domain: [1, 0],
    },
    Reds: {
        name: 'Reds',
        interpolator: d3_scale_chromatic.interpolateReds,
        domain: [1, 0],
    },
    BuGn: {
        name: 'BuGn',
        interpolator: d3_scale_chromatic.interpolateBuGn,
        domain: [1, 0],
    },
    BuPu: {
        name: 'BuPu',
        interpolator: d3_scale_chromatic.interpolateBuPu,
        domain: [1, 0],
    },
    GnBu: {
        name: 'GnBu',
        interpolator: d3_scale_chromatic.interpolateGnBu,
        domain: [1, 0],
    },
    OrRd: {
        name: 'OrRd',
        interpolator: d3_scale_chromatic.interpolateOrRd,
        domain: [1, 0],
    },
    PuBuGn: {
        name: 'PuBuGn',
        interpolator: d3_scale_chromatic.interpolatePuBuGn,
        domain: [1, 0],
    },
    PuBu: {
        name: 'PuBu',
        interpolator: d3_scale_chromatic.interpolatePuBu,
        domain: [1, 0],
    },
    PuRd: {
        name: 'PuRd',
        interpolator: d3_scale_chromatic.interpolatePuRd,
        domain: [1, 0],
    },
    RdPu: {
        name: 'RdPu',
        interpolator: d3_scale_chromatic.interpolateRdPu,
        domain: [1, 0],
    },
    YlGnBu: {
        name: 'YlGnBu',
        interpolator: d3_scale_chromatic.interpolateYlGnBu,
        domain: [1, 0],
    },
    YlGn: {
        name: 'YlGn',
        interpolator: d3_scale_chromatic.interpolateYlGn,
        domain: [1, 0],
    },
    YlOrRd: {
        name: 'YlOrRd',
        interpolator: d3_scale_chromatic.interpolateYlOrRd,
        domain: [1, 0],
    },
}
