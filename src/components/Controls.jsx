function Controls({ filter, onFilterChange, reversed, onReverse }) {
    return (
        <section className="controls">
            <div className="filters">
                {["All", "Ready", "On Quest", "Injured"].map(option => (
                    <button
                        key={option}
                        className={filter === option ? "active" : ""}
                        onClick={() => onFilterChange(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>

            <div className="list-actions">
                <button onClick={onReverse}>
                    {reversed ? "↕ Normal Order" : "↕ Reverse"}
                </button>
            </div>
        </section>
    );
}

export default Controls;