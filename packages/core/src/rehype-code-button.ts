import type { Root, Element } from 'hast'

export function rehypeCodeButton() {
  return (tree: Root) => {
    function isElement(node: unknown): node is Element {
      return (node as Element).type === 'element'
    }

    function visit(node: Element | Root) {
      if (isElement(node) && node.tagName === 'pre') {
        const code = node.children.find(
          (c): c is Element => isElement(c) && c.tagName === 'code'
        )

        if (code) {
          const lang = code.properties?.className
            ? (code.properties.className as string[]).find((c: string) =>
                c.startsWith('language-')
              )?.replace('language-', '') || ''
            : ''

          const header: Element = {
            type: 'element',
            tagName: 'div',
            properties: { className: ['code-header'] },
            children: [
              {
                type: 'element',
                tagName: 'span',
                properties: { className: ['lang'] },
                children: [{ type: 'text', value: lang || 'code' }],
              },
              {
                type: 'element',
                tagName: 'button',
                properties: {
                  className: ['copy-btn'],
                  'data-code': extractText(code),
                },
                children: [{ type: 'text', value: 'Copy' }],
              },
            ],
          }

          const body: Element = {
            type: 'element',
            tagName: 'div',
            properties: { className: ['code-body'] },
            children: node.children,
          }

          const wrapper: Element = {
            type: 'element',
            tagName: 'div',
            properties: { className: ['code-block'] },
            children: [header, body],
          }

          Object.assign(node, wrapper)
        }
        return
      }

      if ('children' in node && node.children) {
        const children = node.children as unknown[]
        for (const child of children) {
          if (isElement(child)) visit(child)
        }
      }
    }

    visit(tree)
  }
}

function extractText(node: Element): string {
  let result = ''
  if ('children' in node && node.children) {
    for (const child of node.children) {
      if (child.type === 'text') result += (child as any).value || ''
      if (child.type === 'element') result += extractText(child as Element)
    }
  }
  return result
}
