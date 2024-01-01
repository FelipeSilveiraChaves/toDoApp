- [Imutabilidade](#imutabilidade)
  - [por que?](#por-que)
- [Programação Imperativa x Programação Declarativa](#programação-imperativa-x-programação-declarativa)
  - [Programação Imperativa](#programação-imperativa)
  - [Programação Declarativa](#programação-declarativa)
- [**REACTJS**](#reactjs)
  - [PROPS](#props)
  - [lidando com datas](#lidando-com-datas)
  - [Name em inputs dentro do Form](#name-em-inputs-dentro-do-form)
  - [Resgatando valor de Iputs/TextArea](#resgatando-valor-de-iputstextarea)
  - [Keys](#keys)
    - [Por que única?](#por-que-única)
    - [Porque não usar indice do Array](#porque-não-usar-indice-do-array)
  - [Comunicação entre componentes](#comunicação-entre-componentes)
  - [Removendo Itens de uma lista](#removendo-itens-de-uma-lista)
  - [Eventos do React, o que eles esperam como parametro?](#eventos-do-react-o-que-eles-esperam-como-parametro)
    - [diferença de dado função e executar a função](#diferença-de-dado-função-e-executar-a-função)
  - [Clousers no React](#clousers-no-react)
- [**TypeScript**](#typescript)
  - [porque?](#porque)
  - [Como usar?](#como-usar)
  - [Caso do Event no ts](#caso-do-event-no-ts)
- [extends](#extends)


# Imutabilidade

as variaveis nao sofrem mutação, nós criamos um novo valor ( um novo espaço em memória)

em vez de mudar uma variavel eu crio outra com o valor atualizado em resumo.

## por que?

A imutabilidade permite que a gente seja mais performático, é mais facil pro react saber o valor unico do que ficar comparando com versões antigas



# Programação Imperativa x Programação Declarativa

## Programação Imperativa

Um estilo de programação em que tu ordena ao computador executar cada ação em passa-a-passo

1. Abrir o pacote da massa de bolo
2. Colocar o pacote em uma forma
3. Ligar o forno a 180­°
4. Esperar o forno aquecer
5. ... resto

## Programação Declarativa 

Um estilo de programação em que tu se concentra em definir o que deve ser alcançado, em vez de dizer explicitamente o como faze-lo.

1. Se tiver comprado o pacote abrir
2. Assim que tiver com ele aberto colocar na forma
3. O forno precisa estar a 180°
4. Quando o forno estiver quente, eu posso colocar a massa para assar



-----------------------------------------------------


# **REACTJS**


## PROPS

Propriedades tem muitas função, principalmente entre ligar o backend com o frontend, mas também uma das principais funcionalidades das props é que é a unica maneira de fazer com que um componente haja diferente dependendo da situação, e a situação é a presença da propriedade.

Ex: se o componente tiver a propriedade "hasBorder", tu faz a lógica para que ele tenha borda

## lidando com datas 

Tem algumas formas de lidar com datas uma delas é com o Intl,

```js
options = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
  timeZone: "America/Los_Angeles",
};
```
que é meio que esse estilo, porém ele é meio complexo de se entender então uma recomendação muito boa do Diego é o uso da biblioteca **date-fns**

```cmd
  npm i date-fns
```
que o uso fica extremamente mais simples,

```jsx
  import { format, formatDistanceToNow } from "date-fns";
  import ptBR from "date-fns/locale/pt-BR";
  
  
  export function Post({author, content, id, publishedAt}){

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'",  {locale: ptBR})

    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
      locale: ptBR,
      addSuffix: true
  })

    return (
      //code...
    )
  } 
```
o metodo `format()` recebe como o primeiro parametro a variavel que tem o dado de [new Date], o segundo é o que explico abaixo, e o terceiro é a linguagem para ser traduzido o nome do mês por exemplo, que tu importa da pasta local como mostrado acima.

esses  *(   "d 'de' LLLL 'às' HH:mm'h'"   )* que aparece ali são codigos que tu ve na documentação deles tirando o que está em aspas simples, que é a parte escrito que realmente vai aparecer. *18 de outubro às 20:48h* assim é que fica 

e o outro também é o `formatDistanceToNow` que ele calcula a data de acordo com o momento de agora, a aquele addSufix, é se tu deseja adicionar um prefixo ao texto 
(há 18 dias, em 1 dia) em de (18 dias, 1 dia)

## Name em inputs dentro do Form

```js
const newCommentText = event.target.comment.value
<form>
  <textarea 
    name="comment"
    placeholder="Deixe um comentário"
  />
</form>
```

se eu não tivesse colocado o *name* no textarea, o [event.target] seria do [form] em si, mas colocar o name em algum input, ou textArea faz com que tu consiga resgatar os valores (melhor maneira ainda é usando o onChange por causa da Programação Declarativa)



## Resgatando valor de Iputs/TextArea

```js
export function Post(){
  const [comments, setComments ] = useState([
    'Post muito bacana hein?',
  ])

  const [newCommentText, setNewCommentText] = useState('')

  function handleNewCommentChange(){
    setNewCommentText(event.target.value)
  }

  function handleCreatedNewComment(){
    setComments([...comments, newCommentText])  
    setNewCommentText('')
  }
  return (
      <form  onSubmit={handleCreatedNewComment} className={styles.commentForm}>
        <textarea 
          placeholder="Deixe um comentário"
          value={newCommentText}
          onChange={handleNewCommentChange}
        />
      </form>
  )
}
```
O resgate do valor, vai se basear muito no *onChange*, em que ele é chamado a cada mudança no input (nesse caso [texarea]),
no onChange é chamado a função `handleNewCommentChange` em que essa função pega o [event.target.value] do onChange, que é o proprio espaço do textarea, e o valor é passado na função `setNewCommentText` que é a função que atualiza o estado de newCommentText.

Então nesse ponto, o estado de newCommentText está guarndando sempre o que é digitado na textarea, então o resto é só pegar o texto armazenado e usar pra atualizar o array de comentários. `setComments([...comments, newCommentText])`, e por ultimo depois que o o botão de handleCreatedNewComment é clicado o `setNewCommentText('')` é chamado para zerar o textarea e ficar novamente o placeholder.

## Keys

### Por que única?

3 momentos em que um componente é renderizado novamente no React.

1. Quando o estado altera;
2. Quando a propriedade altera;
3. Quando um componente pai renderiza novamente;

--------------------------------

O que acontece é que o react toda vez que precisa re-renderizar algo na tela ele vai comparar as keys que existem e as keys que chegaram agora para renderizar somente o necessario, isso que faz com que seja mais performático.

É como se o react tirasse uma foto da tela antes da renderização, e comparasse com o novo, e isso é feito graças as keys que são os identificadores

### Porque não usar indice do Array 

A questão é que o indice pode mudar se voce mudar a ordem dele, mas não necessariamente o conteúdo.

--------------------------------

**O ideal é que seja um ID para tudo porém é possivel usar strings também**

Sempre será necessario colocar keys em componentes que estão sofrendo iteração, como .map e outros.

É basicamente o identificador de cada componente,

sempre vai ser aplicado no primeiro elemento do componente iterado


## Comunicação entre componentes

A unica forma de haver comunicação entre componentes é atravez das *props*, tu pode passar funções como propriedades de componentes no react

```js
//No arquivo do Post
function deleteComment(comment){
    console.log(`Coment ${comment}`)
  }

...code

      <div className={styles.commentList}>
        {
          comments.map(comment => (
            <Comment 
              onDeleteComment={deleteComment}
            />
          ))
        }
      </div>

----------------------------------------------

//No arquivo do Comment

export function Comment({content, onDeleteComment}){
  function handleDeleteComment(){

    onDeleteComment(content)
  }
}
```


## Removendo Itens de uma lista 

Usando a ideia de imutabilidade

```js
  function deleteComment(commentToDelete){
    const commentsWthoutDeletedOne = comments.filter(comment =>  {
      return comment !== commentToDelete;
    })
    setComments(commentsWthoutDeletedOne);
  }
```

metodo `.filter` ele itera sobre um array, o que ele retornar true ele mantém no array, e o false ele retira como é mostrado na linha 

*comment !== commentToDelete;*

## Eventos do React, o que eles esperam como parametro?

os eventos do React esperam sempre um dado do tipo função.

**importante** ^

### diferença de dado função e executar a função

```js
// isso é um dado do tipo função
<button onClick={handleDeleteComment}>
</button>

//isso é um dado do tipo função também
<button onClick={() => setLikeCount(likeCount + 1)}>
</button>


// é mais recomendado usar a primeira opção por legibilidade mesmo.

--------------------------------
// isso é uma execução de uma função.
<button onClick={handleDeleteComment()}>
</button>
```
com a execução da função em vez do dado do tipo função, o react não vai esperar que o click aconteça, ele vai simplesmente executar a função, e dependendo do caso onde a função esteja/o que ela faz isso vai quebrar o codigo


exemplo: se a função aumentar o valor de um estado [(useState)], e como o estado mudando faz com que o React re-renderize as coisas, isso vai virar um loop infinito e crasha a aplicação


## Clousers no React 

sempre que eu for atualizar um estado que eu dependa do valor antigo dele eu preciso atualizar com o padrão de arrow funcion


```js
function handleLikeComment(){
    setLikeCount((state) => {
      return state + 1
    });
  }
```

isso tudo porque isso aqui **NÃO** funciona:

```js
function handleLikeComment(){
    setLikeCount(likeCount + 1);
    setLikeCount(likeCount + 1);
    setLikeCount(likeCount + 1);
    setLikeCount(likeCount + 1);
    setLikeCount(likeCount + 1); 
  }
```

dessa forma sempre o numero de likes vai subir só uma vez, pois tudos compartilham o mesmo contexto antigo

se repetir a forma com a arrow function irá funcionar


# **TypeScript**

TypeScript é uma linguagem de programação extremamente semelhante ao JavaScript, 
porém com a mecanica de *tipagens* em principalmente dados.

## porque?

O uso do ts é essencial para o codigo pois ele praticamente previne o erro, e ele da uma legibilidade e inteligencia muito grande para o código.

## Como usar?

Criando um projeto já desde o inicio com ele é mais fácil mas a configuração.

usando o termo usado no TypeSript para declar o tipo dos dados como por exemplo:

```ts
interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}
```

aqui está definindo que o tipo dos dados é esses acima

e para "linkar" essas tipagens existem tipos

```ts

interface PostProps {
  author: Author; 
  publishedAt: Date;
  content: Content[]; //array com varios contents dentro dele
}

--------------------------------


export function Post({author, content, publishedAt}: PostProps) {}
```

nesse caso tu não pode definir tipo para partes especificas de um objeto, tu tem que definir para o objeto inteiro, e as partes do objeto inteiro serão as propriedades


## Caso do Event no ts

```ts
  function handleCreatedNewComment(event: FormEvent){
    event.preventDefault()
  }
```

nesse caso o TypeSript ele não identifica o tipo do Event, então tu importa o tipo do Event e corresponde pra ele.

```ts
 function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('Este campo é obrigatório!')
  }
```
nesse caso tu precisa especificar o elemento html que tu esta aplicando o evento, por que InvalidEvent é uma tipagem generica(FormEvent não é generico)


# extends

```ts
interface Avatar extends ImgHTMLAttributes<HTMLImageElement> { //isso importa coisas que ja existem numa tag IMG normal, logo nao preciso declarar as padrões
  hasBorder?: boolean;
}

export function Avatar({hasBorder = true,...props }: Avatar){
  return(
    <img 
      className={hasBorder ? styles.avatarWithBorder : styles.avatar} 
      {...props}
    />
  )
}
```

tu cria uma interface, e adiciona a ela todas as propriedades de uma img do html, assim tu não precisa passar manualmente, o ...props vira todas os atributos do html, que podem ser passado a uma imgem
