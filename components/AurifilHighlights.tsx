import React from 'react'
import { Typography, Box } from '@mui/material'

export interface AurifilHighlightsProps {
  example: string
}

let cell = (swatchColor, textColor, name) => {
  return (
    <Box
      sx={{
        mb: '1px',
        padding: '5px',
        width: '100%',
        border: 'none',
        'background-color': swatchColor,
        color: textColor
      }}
    >
      {name}
    </Box>
  )
}

let examples = {
  analogous: () => {
    return (
      <table className="examples" style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td valign="top">
              <Typography component="h3" sx={{ mt: '0px' }}>
                Example 1
              </Typography>
              {cell('#B1441E', '#FFFFFF', 'Aurifil Copper 2350')}
              {cell('#FF4005', '#000000', 'Aurifil Dusty Orange 1154')}
              {cell('#A94627', '#FFFFFF', 'Aurifil Cinnabar 6728')}
              {cell('#CD4F36', '#000000', 'Aurifil Tangerine Dream 6729')}
              {cell('#FF7251', '#000000', 'Aurifil Peach 2215')}
              {cell('#F8C4B9', '#000000', 'Aurifil Fleshy Pink 2420')}
            </td>
            <td valign="top">
              <Typography component="h3" sx={{ mt: '0px' }}>
                Example 2
              </Typography>
              {cell('#113999', '#FFFFFF', 'Aurifil Peacock Blue 6738')}
              {cell('#9BB3E9', '#000000', 'Aurifil Very Light Delft 2770')}
              {cell('#606C86', '#FFFFFF', 'Aurifil Swallow 6734')}
              {cell('#00224C', '#FFFFFF', 'Aurifil Midnight 2745')}
              {cell('#002E7A', '#FFFFFF', 'Aurifil Steel Blue 2775')}
              {cell('#2175D9', '#000000', 'Aurifil Light Wedgewood 2725')}
            </td>
          </tr>
        </tbody>
      </table>
    )
  },
  triadic: () => {
    return (
      <table className="examples" style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td valign="top">
              <Typography component="h3" sx={{ mt: '0px' }}>
                Example 1
              </Typography>
              {cell('#F8AD4A', '#000000', 'Aurifil Golden Honey 2214')}
              {cell('#AA008D', '#FFFFFF', 'Aurifil Magenta 2535')}
              {cell('#DF12BF', '#000000', 'Aurifil Light Magenta 2588')}
              {cell('#EE81E2', '#000000', 'Aurifil Wine 5003')}
              {cell('#512F4D', '#FFFFFF', 'Aurifil Very Dark Eggplant 1240')}
              {cell('#35962B', '#FFFFFF', 'Aurifil Green Yellow 2884')}
              {cell('#387E29', '#FFFFFF', 'Aurifil Dark Grass Green 5018')}
              {cell('#96E78A', '#000000', 'Aurifil Light Fern 2882')}
            </td>
            <td valign="top">
              <Typography component="h3" sx={{ mt: '0px' }}>
                Example 2
              </Typography>
              {cell('#CD4F36', '#000000', 'Aurifil Tangerine Dream 6729')}
              {cell('#FF7251', '#000000', 'Aurifil Peach 2215')}
              {cell('#F8C4B9', '#000000', 'Aurifil Fleshy Pink 2420')}
              {cell('#111565', '#FFFFFF', 'Aurifil Dark Delft Blue 2780')}
              {cell('#A6BE00', '#000000', 'Aurifil Light Leaf Green 1147')}
            </td>
          </tr>
        </tbody>
      </table>
    )
  },
  complementary: () => {
    return (
      <table className="examples" style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td valign="top">
              <Typography component="h3" sx={{ mt: '0px' }}>
                Example 1
              </Typography>
              {cell('#FF7B00', '#000000', 'Aurifil Bright Orange 1133')}
              {cell('#472200', '#FFFFFF', 'Aurifil Chocolate 2360')}
              {cell('#FF7B00', '#000000', 'Aurifil Tramonto a Zoagli 4657')}
              {cell('#606C86', '#FFFFFF', 'Aurifil Swallow 6734')}
            </td>
            <td valign="top">
              <Typography component="h3" sx={{ mt: '0px' }}>
                Example 2
              </Typography>
              {cell('#9C0057', '#FFFFFF', 'Aurifil Red Plum 1100')}
              {cell('#8D2B5D', '#FFFFFF', 'Aurifil Plum 4030')}
              {cell('#47283B', '#FFFFFF', 'Aurifil Very Dark Brown 2465')}
              {cell('#A3C200', '#000000', 'Aurifil Spring Green 1231')}
              {cell('#868A71', '#FFFFFF', 'Aurifil Moonshine 6724')}
            </td>
          </tr>
        </tbody>
      </table>
    )
  },
  hue: () => {
    return (
      <table className="examples" style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td valign="top">
              <Typography component="h3" sx={{ mt: '0px' }}>
                Example 1
              </Typography>
              {cell('#CD4F36', '#000000', 'Aurifil Tangerine Dream 6729')}
              {cell('#FF7251', '#000000', 'Aurifil Peach 2215')}
              {cell('#F8C4B9', '#000000', 'Aurifil Light Blush 2420')}
            </td>
            <td valign="top">
              <Typography component="h3" sx={{ mt: '0px' }}>
                Example 2
              </Typography>
              {cell('#AA008D', '#FFFFFF', 'Aurifil Magenta 2535')}
              {cell('#DF12BF', '#000000', 'Aurifil Light Magenta 2588')}
              {cell('#EE81E2', '#000000', 'Aurifil Wine 5003')}
              {cell('#512F4D', '#FFFFFF', 'Aurifil Very Dark Eggplant 1240')}
            </td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default function AurifilHighlights(props: AurifilHighlightsProps) {
  return <Box sx={{ mb: '60px' }}>{examples[props.example]()}</Box>
}
