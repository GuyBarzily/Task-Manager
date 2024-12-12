import React from 'react';

const ListVisibilityDropDown = ({ taskLists, toggleVisibility }) => {
    return (
        <div className="dropdown">
            <h4>List Visibility</h4>

            <div className="checkboxes">
                {taskLists.map((list) => (
                    <div key={list.id} className="checkbox-item">
                        <label>
                            <input
                                type="checkbox"
                                checked={list.visible}
                                onChange={() => toggleVisibility(list.id)}
                            />
                            {list.title}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListVisibilityDropDown;
