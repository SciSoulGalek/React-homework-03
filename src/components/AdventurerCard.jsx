import { useState } from "react";

function AdventurerCard({
    adventurer,
    onDamage,
    onSendToCamp,
    onChangeStatus,
    onRemove
}) {
    const [energy, setEnergy] = useState(100);

    const hpPercent = (adventurer.hp / adventurer.maxHp) * 100;

    function lowerEnergy() {
        setEnergy(current => Math.max(0, current - 10));
    }

    console.log(`${adventurer.name} rendered`);

    return (
        <article className="adventurer-card">
            <div className="card-header">
                <div>
                    <h3>{adventurer.name}</h3>
                    <p>{adventurer.class} · Level {adventurer.level}</p>
                </div>

                <span className={`status ${adventurer.status.toLowerCase().replace(" ", "-")}`}>
                    {adventurer.status}
                </span>
            </div>

            <div className="hp-section">
                <div className="stat-label">
                    <span>HP</span>
                    <span>{adventurer.hp} / {adventurer.maxHp}</span>
                </div>

                <div className="hp-bar">
                    <div
                        className="hp-fill"
                        style={{ width: `${hpPercent}%` }}
                    />
                </div>
            </div>

            <div className="energy-section">
                <div className="stat-label">
                    <span>Energy</span>
                    <span>{energy} / 100</span>
                </div>

                <div className="energy-bar">
                    <div
                        className="energy-fill"
                        style={{ width: `${energy}%` }}
                    />
                </div>
            </div>

            <div className="card-actions">
                <button onClick={() => onDamage(adventurer.id)}>
                    Take Damage
                </button>

                <button onClick={lowerEnergy}>
                    Lower Energy
                </button>

                {adventurer.status === "Ready" && (
                    <button onClick={() => onChangeStatus(adventurer.id, "On Quest")}>
                        Send on Quest
                    </button>
                )}

                {adventurer.status === "On Quest" && (
                    <button onClick={() => onChangeStatus(adventurer.id, "Ready")}>
                        Return from Quest
                    </button>
                )}

                {adventurer.status === "Injured" && (
                    <button onClick={() => onSendToCamp(adventurer.id)}>
                        Send to Camp
                    </button>
                )}

                <button onClick={() => onRemove(adventurer.id)}>
                    Remove
                </button>
            </div>
        </article>
    );
}

export default AdventurerCard;