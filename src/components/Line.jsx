import PropsType from 'prop-types'

const Line = ({ style }) => {
    return <div className={style} />
}

Line.propTypes = {
    style: PropsType.string.isRequired
}

export default Line
