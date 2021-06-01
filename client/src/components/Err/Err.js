const Err = ({ msg, setErr }) => {


    return (
        <div
            className="error-box"
            onClick={(e) => {
                e.target.style.display = 'none';
                setErr('')
            }}
        >{msg}</div>
    )
}

export default Err;