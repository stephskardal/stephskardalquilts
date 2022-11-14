export const colorColorSorting = {
  sortColorsBy: function (colors, key) {
    return colors.sort(function (a, b) {
      return b[key] - a[key]
    })
  },
  constructColor: function (colorObj) {
    //adapted from http://www.runtime-era.com/2011/11/grouping-html-hex-colors-by-hue-in.html
    var hex = colorObj.hex.substring(1)
    /* Get the RGB values to calculate the Hue. */
    var r = parseInt(hex.substring(0, 2), 16) / 255
    var g = parseInt(hex.substring(2, 4), 16) / 255
    var b = parseInt(hex.substring(4, 6), 16) / 255

    /* Getting the Max and Min values for Chroma. */
    var max = Math.max.apply(Math, [r, g, b])
    var min = Math.min.apply(Math, [r, g, b])

    /* Variables for HSV value of hex color. */
    var chr = max - min
    var hue = 0
    var val = max
    var sat = 0

    if (val > 0) {
      /* Calculate Saturation only if Value isn't 0. */
      sat = chr / val
      if (sat > 0) {
        if (r == max) {
          hue = 60 * ((g - min - (b - min)) / chr)
          if (hue < 0) {
            hue += 360
          }
        } else if (g == max) {
          hue = 120 + 60 * ((b - min - (r - min)) / chr)
        } else if (b == max) {
          hue = 240 + 60 * ((r - min - (g - min)) / chr)
        }
      }
    }
    colorObj.Chroma = chr
    colorObj.Hue = hue
    colorObj.Saturation = sat
    colorObj.Value = val
    colorObj.Luma = 0.3 * r + 0.59 * g + 0.11 * b
    colorObj.red = r
    colorObj.green = g
    colorObj.blue = b
    colorObj.children = []
    colorObj.dist = ''
    return colorObj
  }
}
