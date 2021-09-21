import { Box, Container, useColorModeValue } from '@chakra-ui/react'
import { ResponsivePie } from '@nivo/pie'
import Caption from './shared/caption'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

export default function SingleLevelChart(props) {
  if (!props || props.disabled === true) {
    return null
  }

  const theme = {
    textColor: useColorModeValue('#222', '#fff'),
  }

  const { data, caption, label } = props

  return (
    <Container as="figure" maxW={['lg', null, null, null, 'xl']} p="0" centerContent>
      <Box h="sm" w="full">
        <ResponsivePie
          data={JSON.parse(data.code)}
          theme={theme}
          margin={{ top: 10, right: 160, bottom: 10, left: 160 }}
          startAngle={-25}
          innerRadius={0.5}
          padAngle={1}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
          arcLinkLabelsSkipAngle={8}
          // arcLinkLabelsTextColor={labelColor}
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
          defs={[
            {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: 'rgba(255, 255, 255, 0.3)',
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: 'rgba(255, 255, 255, 0.3)',
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
        />
      </Box>
      <figcaption>
        <Caption title={label} content={caption} />
      </figcaption>
    </Container>
  )
}
