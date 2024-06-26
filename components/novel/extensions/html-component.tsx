import {NodeViewRendererProps, NodeViewWrapper, ReactNodeViewRenderer} from '@tiptap/react'
import React from 'react'
import {mergeAttributes, Node} from '@tiptap/core'
import {CodeBlockOptions} from '@tiptap/extension-code-block'
import {HTMLCodeBlock} from "@/lib/editor/code-block-card";
import {Box, Grid} from "@radix-ui/themes";
import {AICommands} from "@/components/novel/extensions/ai-commands";


const  EditorHTML:React.FC<NodeViewRendererProps> = React.forwardRef(({node,editor,getPos, ...props}, ref) =>  {
         const source = node.textContent;


    return (
             
             <NodeViewWrapper className="react-component-with-content" style={{
                 selectable: true,
                 alignSelf: "center", marginLeft: "20%"
             }}>
                 <Grid>
                     <Box className={"w-full"} style={{
                         display: "flex",
                         flexDirection: "row",
                         justifyContent: "left",
                         justifyItems: "flex-end"
                     }}>
                        <AICommands /> 
                     </Box>

                     {/* <button onClick={() => {*/}
                     {/*     const tr = editor.state.tr;*/}

                     {/*     console.log('click', getPos, getPos instanceof Function && getPos(), editor.isActive('screen') )*/}
                     {/*     console.log('click', editor.state.selection, tr.selection, tr.selection.content(), tr.selectionSet)*/}
                     {/*     */}
                     {/*     editor.chain().focus()*/}
                     {/*         .setNodeSelection(getPos())*/}

                     {/*     console.log('click', getPos, getPos instanceof Function && getPos(), editor.isActive('screen') )*/}

                     {/* } }>::*/}
                     {/*</button>*/}
                     {/*<div ref={ref}>*/}
                     {/*<NodeViewContent className="content"  /> */}
                     <HTMLCodeBlock html={source} {...node.attrs} {...props}  />
                 </Grid>
                 {/*</div>*/}
             </NodeViewWrapper>
        
)

   /*
    <NodeViewWrapper className="react-component-with-content" >
   
            <div className={style.editor}>
             <Editor
                    onChange={update}
                    value={node.editor.getHTML()}
                    height={"100%"}
                    width={"100%"}
                    language={"html"}
                    {...node.node.attrs}
                />
            </div>
            {node.editor.getHTML()}
            <ScreenCodeEditor  id={"responsive-registration"}/>
            <NodeViewContent className="content"  />
        </NodeViewWrapper>
    */
    
})


declare module '@tiptap/core' {

    interface Commands<ReturnType> {
        screen: {
            setScreen: (attributes:any) => ReturnType,
            toggleScreen: (attributes:any) => ReturnType,
         }

    }
}

export interface HtmlNodeOptions extends CodeBlockOptions {
    name: string
}
export const ScreenNode= Node.create<HtmlNodeOptions>({
    name: 'screen',
    content: 'text*',
    group: 'block list',
    // isolating: true,
    // code: true,
    atom: true,
    // defining: true,
    
    inclusive: true, 
    exitable: true,
    selectable: true,
    dragable: true,
   
    onUpdate: ():void => {
        console.log('onUpdate', this);
    },

    addAttributes() {
        return {
           language:"html",
            lang:"html",
            'data-language': "html",
           class: 'language-html',
            
        }
    },
    renderHTML({ node, HTMLAttributes }) {
        return [
            'screen-html', 
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                class: "rounded-md bg-muted text-muted-foreground border p-5 font-mono font-medium",
            }) 
        ]
    },


    parseHTML( ) {
        return [
            {
                tag: 'screen-html'
                
            },
        ]
    },
    addNodeView() {
        const code =()=><code>code</code>
        return ReactNodeViewRenderer(EditorHTML )

    },

    addCommands() {
        return {
            setScreen: attributes => ({ commands }) => {
                return commands.setNode(this.name, attributes)
            }, 
            toggleScreen: attributes => ({ commands }) => {
                return commands.toggleNode(this.name, 'paragraph', attributes)
            },
          
        }
    }
})



export default ScreenNode.configure({
    
    

});