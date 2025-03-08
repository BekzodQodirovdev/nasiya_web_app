import { useParams } from "react-router-dom"


const Debts = () => {
    const {id} = useParams()
  return (
    <div>{id}</div>
  )
}

export default Debts