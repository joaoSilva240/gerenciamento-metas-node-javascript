const {select,input,checkbox}=require('@inquirer/prompts')

let meta ={
    value:"dormir cedo",
    checked:false,
}
let metas=[meta]

const cadastrarMeta=async()=>{
    const meta=await input({message:"digite a meta"})

    if(meta.length==0){
        console.log('a meta nao pode ser vazia.')
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
    console.log('metas concluidas')
}
const mostrarRealizadas=async()=>{
    const realizadas=metas.filter((meta)=>{
        return meta.checked
    })
    if(realizadas.length==0)
    return console.log("não ha metas realizadas")

    await select({
        message:"realizadas",
        choices:[...realizadas]
    })
}


const start =async()=>{
    while(true){
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
            case "sair":
                console.log("tchau")
                return
        }
    }
}
start()