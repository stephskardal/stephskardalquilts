import React from 'react'
import { Box } from '@mui/material'

export interface CourthouseStepsProps {
  part: string
}

let blocks = {
  hst: () => {
    return (
      <div className="hsts">
        <div className="flex_horizontal outer special">
          <div className="strip_vertical outer background first animate-flicker"></div>
          <div className="strip_vertical outer background second"></div>
        </div>
        <p>
          <span>7.5″x7.5″</span>
        </p>
      </div>
    )
  },
  stripAccent: () => {
    return <div className="strip accent">1" strip</div>
  },
  stripBackground: () => {
    return <div className="strip background">1" strip</div>
  },
  onPoint: () => {
    return (
      <div className="onpoint-wrapper">
        <div className="flex_vertical outer trimmed">
          <div className="strip_horizontal outer background"></div>
          <div className="flex_horizontal outer">
            <div className="strip_vertical outer background"></div>
            <div className="flex_vertical trimmed">
              <div className="strip_horizontal accent"></div>
              <div className="flex_horizontal">
                <div className="strip_vertical accent"></div>
                <div className="flex_vertical">
                  <div className="strip_horizontal background"></div>
                  <div className="flex_horizontal">
                    <div className="strip_vertical background"></div>
                    <div className="flex_vertical ">
                      <div className="strip_horizontal accent"></div>
                      <div className="flex_horizontal">
                        <div className="strip_vertical accent"></div>
                        <div className="flex_vertical">
                          <div className="strip_horizontal background"></div>
                          <div className="flex_horizontal">
                            <div className="strip_vertical background"></div>
                            <div className="flex_vertical">
                              <div className="strip_horizontal accent"></div>
                              <div className="flex_horizontal">
                                <div className="strip_vertical accent"></div>
                                <div className="inner background"></div>
                                <div className="strip_vertical accent"></div>
                              </div>
                              <div className="strip_horizontal accent"></div>
                            </div>
                            <div className="strip_vertical background"></div>
                          </div>
                          <div className="strip_horizontal background"></div>
                        </div>
                        <div className="strip_vertical accent"></div>
                      </div>
                      <div className="strip_horizontal accent"></div>
                    </div>
                    <div className="strip_vertical background"></div>
                  </div>
                  <div className="strip_horizontal background"></div>
                </div>
                <div className="strip_vertical accent"></div>
              </div>
              <div className="strip_horizontal accent"></div>
            </div>
            <div className="strip_vertical outer background"></div>
          </div>
          <div className="strip_horizontal outer background"></div>
        </div>
      </div>
    )
  },
  final: () => {
    return (
      <div className="flex_vertical outer trimmed">
        <div className="strip_horizontal outer accent"></div>
        <div className="flex_horizontal outer">
          <div className="strip_vertical outer accent"></div>
          <div className="flex_vertical outer">
            <div className="strip_horizontal background"></div>
            <div className="flex_horizontal">
              <div className="strip_vertical background"></div>
              <div className="flex_vertical ">
                <div className="strip_horizontal accent"></div>
                <div className="flex_horizontal outer">
                  <div className="strip_vertical accent"></div>
                  <div className="flex_vertical">
                    <div className="strip_horizontal background"></div>
                    <div className="flex_horizontal">
                      <div className="strip_vertical background"></div>
                      <div className="flex_vertical">
                        <div className="strip_horizontal accent"></div>
                        <div className="flex_horizontal">
                          <div className="strip_vertical accent"></div>
                          <div className="inner background"></div>
                          <div className="strip_vertical accent"></div>
                        </div>
                        <div className="strip_horizontal accent"></div>
                      </div>
                      <div className="strip_vertical background"></div>
                    </div>
                    <div className="strip_horizontal background"></div>
                  </div>
                  <div className="strip_vertical accent"></div>
                </div>
                <div className="strip_horizontal accent"></div>
              </div>
              <div className="strip_vertical background"></div>
            </div>
            <div className="strip_horizontal background"></div>
          </div>
          <div className="strip_vertical outer accent"></div>
        </div>
        <div className="strip_horizontal outer accent"></div>
      </div>
    )
  },
  level1: () => {
    return (
      <div className="flex_horizontal outer">
        <div className="top_trim animate-flicker double"></div>
        <div className="strip_vertical outer accent"></div>
        <div className="inner background"></div>
        <div className="strip_vertical outer accent"></div>
        <div className="bottom_trim double animate-flicker"></div>
      </div>
    )
  },
  level2: () => {
    return (
      <div className="flex_vertical outer">
        <div className="strip_horizontal outer accent"></div>
        <div className="flex_horizontal outer">
          <div className="strip_vertical outer accent"></div>
          <div className="inner background"></div>
          <div className="strip_vertical outer accent"></div>
        </div>
        <div className="strip_horizontal outer accent"></div>
      </div>
    )
  },
  level2_rotated: () => {
    return (
      <div className="flex_horizontal outer">
        <div className="strip_vertical outer accent"></div>
        <div className="flex_vertical outer">
          <div className="strip_horizontal outer accent"></div>
          <div className="inner background"></div>
          <div className="strip_horizontal outer accent"></div>
        </div>
        <div className="strip_vertical outer accent"></div>
      </div>
    )
  },
  level3: () => {
    return (
      <div className="flex_horizontal outer">
        <div className="strip_vertical outer background"></div>
        <div className="flex_vertical outer">
          <div className="strip_horizontal outer accent"></div>
          <div className="flex_horizontal outer">
            <div className="strip_vertical accent"></div>
            <div className="inner background"></div>
            <div className="strip_vertical accent"></div>
          </div>
          <div className="strip_horizontal outer accent"></div>
        </div>
        <div className="strip_vertical outer background"></div>
      </div>
    )
  },
  level4: () => {
    return (
      <div className="flex_vertical outer trimmed">
        <div className="strip_horizontal outer background"></div>
        <div className="flex_horizontal outer">
          <div className="strip_vertical outer background"></div>
          <div className="flex_vertical outer">
            <div className="strip_horizontal  accent"></div>
            <div className="flex_horizontal">
              <div className="strip_vertical accent"></div>
              <div className="inner background"></div>
              <div className="strip_vertical accent"></div>
            </div>
            <div className="strip_horizontal accent"></div>
          </div>
          <div className="strip_vertical outer background"></div>
        </div>
        <div className="strip_horizontal outer background"></div>
      </div>
    )
  },
  level4_rotated: () => {
    return (
      <div className="flex_horizontal outer">
        <div className="strip_vertical outer background"></div>
        <div className="flex_vertical outer">
          <div className="strip_horizontal outer background"></div>
          <div className="flex_horizontal outer">
            <div className="strip_vertical accent"></div>
            <div className="flex_vertical">
              <div className="strip_horizontal accent"></div>
              <div className="inner background"></div>
              <div className="strip_horizontal accent"></div>
            </div>
            <div className="strip_vertical accent"></div>
          </div>
          <div className="strip_horizontal outer background"></div>
        </div>
        <div className="strip_vertical outer background"></div>
      </div>
    )
  },
  level5: () => {
    return (
      <div className="flex_horizontal outer">
        <div className="strip_vertical outer accent"></div>
        <div className="flex_vertical">
          <div className="strip_horizontal outer background"></div>
          <div className="flex_horizontal">
            <div className="strip_vertical background"></div>
            <div className="flex_vertical">
              <div className="strip_horizontal accent"></div>
              <div className="flex_horizontal">
                <div className="strip_vertical accent"></div>
                <div className="inner background"></div>
                <div className="strip_vertical accent"></div>
              </div>
              <div className="strip_horizontal accent"></div>
            </div>
            <div className="strip_vertical background"></div>
          </div>
          <div className="strip_horizontal outer background"></div>
        </div>
        <div className="strip_vertical outer accent"></div>
      </div>
    )
  },
  level6: () => {
    return (
      <div className="flex_vertical outer trimmed">
        <div className="strip_horizontal outer accent"></div>
        <div className="flex_horizontal outer">
          <div className="strip_vertical outer accent"></div>
          <div className="flex_vertical">
            <div className="strip_horizontal background"></div>
            <div className="flex_horizontal">
              <div className="strip_vertical background"></div>
              <div className="flex_vertical">
                <div className="strip_horizontal  accent"></div>
                <div className="flex_horizontal">
                  <div className="strip_vertical accent"></div>
                  <div className="inner background"></div>
                  <div className="strip_vertical accent"></div>
                </div>
                <div className="strip_horizontal accent"></div>
              </div>
              <div className="strip_vertical background"></div>
            </div>
            <div className="strip_horizontal background"></div>
          </div>
          <div className="strip_vertical outer accent"></div>
        </div>
        <div className="strip_horizontal outer accent"></div>
      </div>
    )
  },
  level6_rotated: () => {
    return (
      <div className="flex_horizontal outer">
        <div className="strip_vertical outer accent"></div>
        <div className="flex_vertical outer">
          <div className="strip_horizontal outer accent"></div>
          <div className="flex_horizontal">
            <div className="strip_vertical background"></div>
            <div className="flex_vertical">
              <div className="strip_horizontal background"></div>
              <div className="flex_horizontal">
                <div className="strip_vertical  accent"></div>
                <div className="flex_vertical">
                  <div className="strip_horizontal accent"></div>
                  <div className="inner background"></div>
                  <div className="strip_horizontal accent"></div>
                </div>
                <div className="strip_vertical accent"></div>
              </div>
              <div className="strip_horizontal background"></div>
            </div>
            <div className="strip_vertical background"></div>
          </div>
          <div className="strip_horizontal outer accent"></div>
        </div>
        <div className="strip_vertical outer accent"></div>
      </div>
    )
  },
  level7: () => {
    return (
      <div className="flex_horizontal outer">
        <div className="strip_vertical outer background"></div>
        <div className="flex_vertical outer">
          <div className="strip_horizontal outer accent"></div>
          <div className="flex_horizontal outer">
            <div className="strip_vertical accent"></div>
            <div className="flex_vertical">
              <div className="strip_horizontal background"></div>
              <div className="flex_horizontal">
                <div className="strip_vertical background"></div>
                <div className="flex_vertical">
                  <div className="strip_horizontal accent"></div>
                  <div className="flex_horizontal">
                    <div className="strip_vertical accent"></div>
                    <div className="inner background"></div>
                    <div className="strip_vertical accent"></div>
                  </div>
                  <div className="strip_horizontal accent"></div>
                </div>
                <div className="strip_vertical background"></div>
              </div>
              <div className="strip_horizontal background"></div>
            </div>
            <div className="strip_vertical accent"></div>
          </div>
          <div className="strip_horizontal outer accent"></div>
        </div>
        <div className="strip_vertical outer background"></div>
      </div>
    )
  },
  level8: () => {
    return (
      <div className="flex_vertical outer trimmed">
        <div className="strip_horizontal outer background"></div>
        <div className="flex_horizontal outer">
          <div className="strip_vertical outer background"></div>
          <div className="flex_vertical outer">
            <div className="strip_horizontal accent"></div>
            <div className="flex_horizontal outer">
              <div className="strip_vertical accent"></div>
              <div className="flex_vertical">
                <div className="strip_horizontal background"></div>
                <div className="flex_horizontal">
                  <div className="strip_vertical background"></div>
                  <div className="flex_vertical">
                    <div className="strip_horizontal accent"></div>
                    <div className="flex_horizontal">
                      <div className="strip_vertical accent"></div>
                      <div className="inner background"></div>
                      <div className="strip_vertical accent"></div>
                    </div>
                    <div className="strip_horizontal accent"></div>
                  </div>
                  <div className="strip_vertical background"></div>
                </div>
                <div className="strip_horizontal background"></div>
              </div>
              <div className="strip_vertical accent"></div>
            </div>
            <div className="strip_horizontal accent"></div>
          </div>
          <div className="strip_vertical outer background"></div>
        </div>
        <div className="strip horizontal outer background"></div>
      </div>
    )
  },
  level8_rotated: () => {
    return (
      <div className="flex_horizontal outer">
        <div className="strip_vertical outer background"></div>
        <div className="flex_vertical outer">
          <div className="strip_horizontal outer background"></div>
          <div className="flex_horizontal outer">
            <div className="strip_vertical accent"></div>
            <div className="flex_vertical outer">
              <div className="strip_horizontal accent"></div>
              <div className="flex_horizontal">
                <p></p>
                <div className="strip_vertical background"></div>
                <div className="flex_vertical">
                  <div className="strip_horizontal background"></div>
                  <div className="flex_horizontal">
                    <div className="strip_vertical accent"></div>
                    <div className="flex_vertical">
                      <div className="strip_horizontal accent"></div>
                      <div className="inner background"></div>
                      <div className="strip_horizontal accent"></div>
                    </div>
                    <div className="strip_vertical accent"></div>
                  </div>
                  <div className="strip_horizontal background"></div>
                </div>
                <div className="strip_vertical background"></div>
              </div>
              <div className="strip_horizontal accent"></div>
            </div>
            <div className="strip_vertical accent"></div>
          </div>
          <div className="strip_horizontal outer background"></div>
        </div>
        <div className="strip_vertical outer background"></div>
      </div>
    )
  },
  level9: () => {
    return (
      <div className="flex_horizontal outer">
        <div className="strip_vertical outer accent"></div>
        <div className="flex_vertical outer">
          <div className="strip_horizontal outer background"></div>
          <div className="flex_horizontal">
            <div className="strip_vertical background"></div>
            <div className="flex_vertical ">
              <div className="strip_horizontal accent"></div>
              <div className="flex_horizontal outer">
                <div className="strip_vertical accent"></div>
                <div className="flex_vertical">
                  <div className="strip_horizontal background"></div>
                  <div className="flex_horizontal">
                    <div className="strip_vertical background"></div>
                    <div className="flex_vertical">
                      <div className="strip_horizontal accent"></div>
                      <div className="flex_horizontal">
                        <div className="strip_vertical accent"></div>
                        <div className="inner background"></div>
                        <div className="strip_vertical accent"></div>
                      </div>
                      <div className="strip_horizontal accent"></div>
                    </div>
                    <div className="strip_vertical background"></div>
                  </div>
                  <div className="strip_horizontal background"></div>
                </div>
                <div className="strip_vertical accent"></div>
              </div>
              <div className="strip_horizontal accent"></div>
            </div>
            <div className="strip_vertical background"></div>
          </div>
          <div className="strip_horizontal outer background"></div>
        </div>
        <div className="strip_vertical outer accent"></div>
      </div>
    )
  }
}

let methods = {
  intro: () => {
    return (
      <div className="block_row_wrapper">
        <div className="block_row">
          {[...Array(4)].map((i) => {
            return blocks.final()
          })}
        </div>
      </div>
    )
  },
  step1: () => {
    return (
      <div id="step1">
        {blocks.stripAccent()}
        <div className="center_strip background">4.5″x18″</div>
        {blocks.stripAccent()}
      </div>
    )
  },
  step2_block: (i) => {
    let extraClass = i == 0 ? 'first' : ''
    return (
      <div>
        <div className="accent strip-top first"></div>
        <div className={`background strip-middle ${extraClass}`}>
          <img
            src="http://www.stephskardalquilts.com/wp-content/uploads/2018/03/left-1.png"
            alt=""
            width="20"
          />{' '}
          4.5″
          <img
            src="http://www.stephskardalquilts.com/wp-content/uploads/2018/03/right-1.png"
            alt=""
            width="20"
          />
        </div>
        <div className="accent strip-top first"></div>
        <div className="right_trim animate-flicker"></div>
      </div>
    )
  },
  step2: () => {
    return (
      <div id="step2-blocks">
        {[...Array(4)].map((_i, index) => {
          return methods.step2_block(index)
        })}
      </div>
    )
  },
  step3_block: () => {
    return (
      <div className="flex_horizontal outer">
        <div className="strip_vertical outer accent"></div>
        <div className="inner background"></div>
        <div className="strip_vertical outer accent"></div>
      </div>
    )
  },
  step3: () => {
    return (
      <div className="block_row_wrapper">
        {blocks.stripAccent()}
        <div className="block_row">
          {[...Array(4)].map((i) => {
            return methods.step3_block()
          })}
        </div>
        {blocks.stripAccent()}
      </div>
    )
  },
  step4: () => {
    return (
      <div className="block_row_wrapper" id="step4">
        {blocks.stripAccent()}
        <div className="block_row">
          {[...Array(4)].map((i) => {
            return blocks.level1()
          })}
        </div>
        {blocks.stripAccent()}
      </div>
    )
  },
  step4_b: () => {
    return (
      <div className="block_row_wrapper">
        <div className="block_row">
          <div className="block_row">
            {[...Array(4)].map((i) => {
              return blocks.level2()
            })}
          </div>
        </div>
      </div>
    )
  },
  step5: () => {
    return (
      <div className="block_row_wrapper">
        {blocks.stripBackground()}
        <div className="block_row">
          {[...Array(4)].map((i) => {
            return blocks.level2_rotated()
          })}
        </div>
        {blocks.stripBackground()}
      </div>
    )
  },
  step6: () => {
    return (
      <div className="block_row_wrapper">
        {blocks.stripBackground()}
        <div className="block_row">
          {[...Array(4)].map((i) => {
            return blocks.level3()
          })}
        </div>
        {blocks.stripBackground()}
      </div>
    )
  },
  step6_b: () => {
    return (
      <div className="block_row_wrapper">
        <div className="block_row">
          {[...Array(4)].map((i) => {
            return blocks.level4()
          })}
        </div>
      </div>
    )
  },
  step7: () => {
    return (
      <div className="block_row_wrapper">
        {blocks.stripAccent()}
        <div className="block_row">
          {[...Array(4)].map((i) => {
            return blocks.level4_rotated()
          })}
        </div>
        {blocks.stripAccent()}
      </div>
    )
  },
  step8: () => {
    return (
      <div className="block_row_wrapper">
        {blocks.stripAccent()}
        <div className="block_row">
          {[...Array(4)].map((i) => {
            return blocks.level5()
          })}
        </div>
        {blocks.stripAccent()}
      </div>
    )
  },
  step8_b: () => {
    return (
      <div className="block_row_wrapper">
        <div className="block_row">
          {[...Array(4)].map((i) => {
            return blocks.level6()
          })}
        </div>
      </div>
    )
  },
  step9: () => {
    return (
      <div className="block_row_wrapper">
        {blocks.stripBackground()}
        <div className="block_row">
          {[...Array(4)].map((i) => {
            return blocks.level6_rotated()
          })}
        </div>
        {blocks.stripBackground()}
      </div>
    )
  },
  step10: () => {
    return (
      <div className="block_row_wrapper">
        {blocks.stripBackground()}
        <div className="block_row">
          {[...Array(4)].map((i) => {
            return blocks.level7()
          })}
        </div>
        {blocks.stripBackground()}
      </div>
    )
  },
  step10_b: () => {
    return (
      <div className="block_row_wrapper">
        <div className="block_row">
          {[...Array(4)].map((i) => {
            return blocks.level8()
          })}
        </div>
      </div>
    )
  },
  step11: () => {
    return (
      <div className="block_row_wrapper">
        {blocks.stripAccent()}
        <div className="block_row">
          {[...Array(4)].map((i) => {
            return blocks.level8_rotated()
          })}
        </div>
        {blocks.stripAccent()}
      </div>
    )
  },
  step12: () => {
    return (
      <div className="block_row_wrapper">
        {blocks.stripAccent()}
        <div className="block_row">
          {[...Array(4)].map((i) => {
            return blocks.level9()
          })}
        </div>
        {blocks.stripAccent()}
      </div>
    )
  },
  step12_b: () => {
    return (
      <div className="block_row_wrapper">
        <div className="block_row">
          {[...Array(4)].map((i) => {
            return blocks.final()
          })}
        </div>
      </div>
    )
  },
  step13: () => {
    return (
      <div className="step13">
        <div className="hst-wrapper">
          {[...Array(4)].map((i) => {
            return blocks.hst()
          })}
          <div>+ 4 more</div>
        </div>
      </div>
    )
  },
  finish: () => {
    return (
      <div className="step13">
        <div className="onpoint-wrappers">
          {[...Array(2)].map((i) => {
            return blocks.onPoint()
          })}
        </div>
        <div className="onpoint-wrappers">
          {[...Array(2)].map((i) => {
            return blocks.onPoint()
          })}
        </div>
      </div>
    )
  }
}

export default function CourthouseSteps(props: CourthouseStepsProps) {
  return (
    <Box sx={{ width: '800px', m: '0px auto' }} className="courthouse-steps">
      {methods[props.part]()}
    </Box>
  )
}
