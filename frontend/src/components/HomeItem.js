import React from 'react';

const HomeItem = ({item}) => {
    
    return (
        <div>
            <div>
                <div>
                    <img className="profile_picture"></img>
                </div>
                <div>{item.displayPicture}</div>
                <div>{item.name}</div>
                <div>{item.category}</div>
                <div>{item.price}</div>
                <div>{item.quantity}</div>
                <div>{item.salesCount}</div>
                <div>{item.description}</div>
            </div>
        </div>
    )
}

export default HomeItem