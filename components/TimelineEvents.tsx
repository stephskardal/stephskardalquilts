import * as React from 'react'
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { Typography, Box } from '@mui/material'
import AdjustIcon from '@mui/icons-material/Adjust'
import Image from 'next/legacy/image'

let lightAqua = '#ecfefa'

export interface TimelineEventsProps {
  timeline
}

function TimelineEvents(props: TimelineEventsProps) {
  return (
    <VerticalTimeline lineColor={'black'} animate={false}>
      {props.timeline.map((timelineEvent) => {
        return (
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentArrowStyle={{ borderRight: `7px solid ${lightAqua}` }}
            contentStyle={{ background: lightAqua, color: '#000' }}
            iconStyle={{ background: lightAqua, color: '#000' }}
            icon={<AdjustIcon />}
          >
            <Typography
              component="h5"
              className="vertical-timeline-element-subtitle"
            >
              {timelineEvent.date}
            </Typography>
            <Typography
              component="h2"
              className="vertical-timeline-element-title"
            >
              {timelineEvent.title}
            </Typography>
            {timelineEvent.image !== undefined && (
              <Box sx={{ textAlign: 'center', mt: '30px' }}>
                {timelineEvent.height < 150 && (
                  <Image
                    src={`/timeline/${timelineEvent.image}`}
                    height={timelineEvent.height}
                    width={timelineEvent.width}
                    alt="Timeline Event"
                  />
                )}
                {timelineEvent.height >= 150 && (
                  <Image
                    src={`/timeline/${timelineEvent.image}`}
                    height={
                      timelineEvent.height > 250 ? 250 : timelineEvent.height
                    }
                    width={(timelineEvent.width * 250) / timelineEvent.height}
                    alt="Timeline Event"
                  />
                )}
              </Box>
            )}
            {<Typography>{timelineEvent.text}</Typography>}
          </VerticalTimelineElement>
        )
      })}
    </VerticalTimeline>
  )
}

export default TimelineEvents
