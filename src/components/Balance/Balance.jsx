import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { setBalance, updateBalance } from "../../red/actions";

const Balance = () => {
    const dispatch = useDispatch();
    const balance = useSelector((state) => state.balance.balance);
    const [newBalance, setNewBalance] = useState(balance);
    const [isEditing, setIsEditing] = useState(false);


    const handleChange = (e) => {
        setNewBalance(Number(e.target.value));
    }

    const handleToggleEdit = () => {
        if (isEditing) {
            dispatch(setBalance(newBalance));
        }
        setIsEditing(!isEditing);
    };

    return (
        <div style={{ marginTop: "20px", display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center"}}>
          <h2 style={{ fontSize: "14px", color: "white", marginRight: "10px"}}>${balance}.00</h2>
            {isEditing && (
                <div>
                <input style={{ 
                    height : "20px",
                    borderRadius: "5px",
                    marginRight: "10px"
                }} type="number" value={newBalance} onChange={handleChange} />
                </div>
            )}
            <button onClick={handleToggleEdit} style={{
            color:"white",
            height: "30px",
            width: "50px",
            fontSize: "12px",
            background: "rgb(21, 24, 33)",
            borderRadius: "8px",
            padding: "2px 5px",
            borderColor: "white",
            color: "white",
          }}>
            {isEditing ? 'Save' : 'Add'}
            </button>
        </div>
    );
}


export default Balance;