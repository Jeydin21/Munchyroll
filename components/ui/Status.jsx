function Status({ status }) {
  const statusList = {
    "Completed": "bg-emerald-500",
    "Ongoing": "bg-yellow-500",
    "Not yet aired": "bg-red-500",
  }

  return (
    <div className="pl-2 flex items-center">
      <span
        title={`Status: ${status}`}
        className={`inline-flex items-center justify-center h-3 w-3 rounded-full ${statusList[status]}`}>
      </span>
    </div>
  )

}

export default Status;