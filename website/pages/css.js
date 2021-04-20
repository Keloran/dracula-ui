import {
  Anchor,
  Box,
  Heading,
  Paragraph,
  Table,
  Text
} from '@dracula/dracula-ui'
import React from 'react'
import Docs from '../layouts/Docs'
import styles from './index.module.css'
import classes from '@dracula/dracula-ui/dsp/data/css.json'
import components from '@dracula/dracula-ui/dsp/data/components.json'
import { groupBy } from 'lodash'
import Link from 'next/link'

const classGroup = groupBy(classes.entities, (entity) => {
  const [prefix, second, ..._rest] = entity.name.split('-')
  return `${prefix}-${second}`
})

export async function getStaticProps() {
  return {
    props: {
      query: {
        title: 'CSS',
        description: 'Learn how to use specific Dracula UI CSS Classes.'
      }
    }
  }
}

class Spacing extends React.Component {
  render() {
    return (
      <Box>
        <Box my="lg">
          <Heading as="h2" size="xl" color="cyanGreen">
            CSS Classes Index
          </Heading>
          <Paragraph>
            Dracula UI ships with abstracted Components and Patterns that can be
            used for some of the most common web experiences out of the box.
          </Paragraph>

          <Paragraph>
            However, we understand that some engineers might want use specific
            CSS classes in order to customize their websites. The following
            table contains an index with all Dracula UI CSS classes.
          </Paragraph>
        </Box>

        <Paragraph className={styles.description}>
          Feel free to mix and match whatever styling strategy makes sense for
          your project.
        </Paragraph>

        {Object.keys(classGroup).map((group) => {
          const [_prefix, component] = group.split('-')
          const match = components.entities.find(
            (comp) => comp.name.toLowerCase() === component.toLowerCase()
          )

          return (
            <Box key={group} my="lg">
              {!match && (
                <Heading size="xl" pb="sm" color="white">
                  {component}
                </Heading>
              )}

              {match && (
                <Link href={`/${match.name.toLowerCase()}`} passHref>
                  <Anchor>
                    <Heading size="xl" color="purpleCyan">
                      {match.name}
                    </Heading>
                  </Anchor>
                </Link>
              )}

              {match && (
                <Paragraph className={styles.description} size="sm">
                  {match.description}
                </Paragraph>
              )}
              <Table variant="striped">
                <tbody>
                  {classGroup[group].map((clz) => {
                    return (
                      <tr key={clz.name}>
                        <td>
                          <Text color="white">{clz.name}</Text>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </Box>
          )
        })}
      </Box>
    )
  }
}

Spacing.Layout = Docs

export default Spacing