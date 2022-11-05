import React from 'react'
import { renderPatinaTest } from '../tests/RenderPatinaTest'
import { screen } from '@testing-library/react'
import Links from './Links'
import { LinkType } from '../../types/greendot-types'

let linksProps = {
  links: [
    {
      linkType: LinkType.Jira,
      avatar: 'jira',
      label: 'Jira',
      url: 'jira_url'
    },
    {
      linkType: LinkType.Jenkins,
      avatar: 'jenkins',
      label: 'Jenkins',
      url: 'jenkins_url'
    }
  ]
}

describe('Links', () => {
  it('renders correctly', () => {
    renderPatinaTest(<Links {...linksProps} />)
    expect(screen.getByText('Jenkins', { exact: true })).toBeInTheDocument()
    expect(screen.getByText('Jira', { exact: true })).toBeInTheDocument()
    expect(screen.getByText('Merge Queue', { exact: true })).toBeInTheDocument()
  })
})
