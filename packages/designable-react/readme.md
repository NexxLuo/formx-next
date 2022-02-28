添加缺失组件

const Space=(props)=>{
  return <div {...props}></div>
}

type TypographyProps={
  Link:any
};

const Typography=(props)=>{
  return <div {...props}></div>
}

Typography.Link=(props)=>{
  return <div {...props}></div>
}