import style from '../style'

const Container = (props) => {
  return (
    <section className={props.classCustom}>
        <div className={`${!props.maxWidthNone ? style.boxWidth : ""} mx-auto`}>{props.children}</div>
    </section>
  )
}

export default Container