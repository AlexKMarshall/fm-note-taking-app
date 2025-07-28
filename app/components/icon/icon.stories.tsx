import type { Meta } from '@storybook/react-vite'

import { Icon } from './icon'
import { iconNames } from './names'

const meta = {
  title: 'Icon',
  component: Icon,
  tags: ['autodocs'],
} satisfies Meta<typeof Icon>

export default meta

export const AllIcons = {
  render: function Render() {
    return (
      <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-8">
        {iconNames.map((name) => (
          <div
            key={name}
            className="flex flex-col items-center gap-2 text-center"
          >
            <Icon name={name} className="size-6" />
            <span className="text-xs">{name}</span>
          </div>
        ))}
      </div>
    )
  },
}
