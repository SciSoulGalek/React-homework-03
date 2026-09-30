function Resting({ adventurers, onRecover }) {
    return (
        <section className="resting">
            <div>
                <h2>🏕️ Resting Camp</h2>
                <p>Adventurers who need time to recover will appear here.</p>
            </div>

            {adventurers.length === 0 ? (
                <div className="empty-camp">
                    <span>🔥</span>
                    <p>No adventurers are resting.</p>
                </div>
            ) : (
                <div className="camp-list">
                    {adventurers.map(adventurer => (
                        <div className="camp-card" key={adventurer.id}>
                            <div>
                                <h3>{adventurer.name}</h3>
                                <p>
                                    {adventurer.class} · {adventurer.hp} / {adventurer.maxHp} HP
                                </p>
                            </div>

                            <button onClick={() => onRecover(adventurer.id)}>
                                Recover
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default Resting;