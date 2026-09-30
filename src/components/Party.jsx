import AdventurerCard from "./AdventurerCard";

function Party({
    adventurers,
    onDamage,
    onSendToCamp,
    onChangeStatus,
    onAdd,
    onRemove,
    resetVersions
}) {
    return (
        <main className="party">
            <div className="party-heading">
                <h2>⚔️ Active Party</h2>
                <button onClick={onAdd}>+ Recruit Adventurer</button>
            </div>

            <div className="party-grid">
                {adventurers.map(adventurer => (
                    <AdventurerCard
                        key={`${adventurer.id}-${resetVersions[adventurer.id] || 0}`}
                        adventurer={adventurer}
                        onDamage={onDamage}
                        onSendToCamp={onSendToCamp}
                        onChangeStatus={onChangeStatus}
                        onRemove={onRemove}
                    />
                ))}
            </div>
        </main>
    );
}

export default Party;