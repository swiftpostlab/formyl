---
description: Rules that apply to the main package
files: packages/main/**/*.{ts,tsx}
---

# Main projects guidelines

- Imports for components from `@mui/material` are replaced by `@swiftpost/elysium` e.g. `import Box from '@mui/material/Box';` should instead be `import Box from '@swiftpost/elysium/ui/base/Box';`
- `@swiftpost/elysium/ui/base/Text` has the same interface as MUI typography
- Use `<Text variant="h1">` and similar instead of h1, h2, etc...
- Imports for MUI Icons can be applied normally
- Use Link from import Link from `@/components/Link`;
- Reusable components are in `@/components`
- If the component takes props, create a `Props` interface and use the type `React.FC<Props>` in creating the component
- Example component:

```tsx
import Box from '@swiftpost/elysium/ui/base/Box';
import Text from '@swiftpost/elysium/ui/base/Text';

interface Props {
  foo: string,
  children: React.ReactNode
}

const MyComponent: React.FC = () => {
  return (
    <Box>
      <Text>{`Something ${foo}`}</Text>
      <Box>{children}</Box>
    </Box>
  )
}

export type MyComponentProps = Props;
export default MyComponent;
```
