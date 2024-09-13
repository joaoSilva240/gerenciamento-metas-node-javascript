const {select,input,checkbox}=require('@inquirer/prompts')
const fs=require("fs").promises

let mensagem="bem-vindo"

let metas=[]

const carregarMetas =async()=>{
    try{const dados=await fs.readFile("metas.json","utf-8")
        metas=JSON.parse(dados)
    }
    catch(erro){
        metas=[]
    }
}
const salvarMetas=async()=>{
    await fs.writeFile("metas.json",JSON.stringify(metas,null,2))
}

const cadastrarMeta=async()=>{
    const meta=await input({message:"digite a meta"})

    if(meta.length==0){
        mensagem='a meta nao pode ser vazia.'
        return 
    }
    metas.push(
        {value:meta, checked:false}

    )
}
const listarMetas=async ()=>{
    const respostas=await checkbox({
        message:"use as setas para mudar de meta, o espaço para selecionar e o emter para finalizar a etapa",
        choices: [...metas],
        instructions:false

    })
    metas.forEach((m)=>{
        m.checked=false
    })

    if(respostas.length==0){
        console.log('nenhuma meta selecionada')
        return
    }

   
    
    respostas.forEach((resposta)=>{
        const meta=metas.find((m)=>{return m.value==resposta})
        meta.checked=true
    })
    mensagem='metas concluidas'
}
const mostrarRealizadas=async()=>{
    const realizadas=metas.filter((meta)=>{
        return meta.checked
    })
    if(realizadas.length==0)
    return mensagem="não ha metas realizadas"

    await select({
        message:"metas realizadas:"+realizadas.length,
        choices:[...realizadas]
    })
}
const metasAbertas=async()=>{
    const abertas=metas.filter((meta)=>{
        return meta.checked !=true
    })

    if(abertas.length==0){
        return mensagem="não existem metas abertas!"
    }
    await select({
        message:"total de metas abertas:"+ abertas.length,
        choices:[...abertas]
    })
}
const deletarMetas=async()=>{
    const metasDesmarcadas=metas.map((meta)=>{
        return {value:meta.value, checked:false}
    })
    const delet=await checkbox({
        message:"escolha a meta para deletar",
        choices:[...metasDesmarcadas],
        instructions:false
    })
    if(delet.length==0){
        return mensagem="nenhum item para deletar"
    }
    delet.forEach((item)=>{
        metas=metas.filter((meta)=>{
            return meta.value!=item
        })
    })
    mensagem="metas deletadas com sucesso"
    
}
const mostrarMensagem=()=>{
    console.clear()
if(mensagem!=""){
    console.log(mensagem)
    console.log("")
    mensagem=""
}

}

const start =async()=>{
    carregarMetas()
    while(true){
        mostrarMensagem() 
        await salvarMetas()
        const opcao= await select({
            message:"Menu >",
            choices:[
                {
                    name:"cadastrar meta",
                    value:"cadastrar"
                },
                {
                    name:"vamos listar",
                    value:"listar"
                },
                {
                    name:"metas realizadas",
                    value:"realizadas"
                },
                {
                    name:"metas abertas",
                    value:"abertas"
                },
                {
                    name:"deletar metas",
                    value:"deletar"
                },
                
                {
                    name:"sair",
                    value:"sair"
                }

            ]
        })

        switch(opcao){
            case "cadastrar":
                await cadastrarMeta()
                console.log(metas)
                break
            case "listar":
                await listarMetas()
                break
            case "realizadas":
                await mostrarRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "deletar":
                await deletarMetas()
                break
            case "sair":
                console.log("tchau")
                return
        }
    }
}
start()