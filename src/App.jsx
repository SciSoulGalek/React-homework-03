import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Controls from "./components/Controls";
import Party from "./components/Party";
import Resting from "./components/Resting";

function App() {
    const [adventurers, setAdventurers] = useState([
        {
            id: 1,
            name: "Kael",
            class: "Warrior",
            level: 12,
            hp: 100,
            maxHp: 100,
            status: "Ready"
        },
        {
            id: 2,
            name: "Lyra",
            class: "Mage",
            level: 9,
            hp: 70,
            maxHp: 70,
            status: "On Quest"
        },
        {
            id: 3,
            name: "Doran",
            class: "Rogue",
            level: 10,
            hp: 0,
            maxHp: 80,
            status: "Injured"
        },
        {
            id: 4,
            name: "Mira",
            class: "Ranger",
            level: 8,
            hp: 90,
            maxHp: 90,
            status: "Ready"
        }
    ]);

    const [filter, setFilter] = useState("All");
    const [reversed, setReversed] = useState(false);
    const [resetVersions, setResetVersions] = useState({});

    function damageAdventurer(id) {
        setAdventurers(current =>
            current.map(adventurer =>
                adventurer.id === id
                    ? {
                          ...adventurer,
                          hp: Math.max(0, adventurer.hp - 10),
                          status:
                              adventurer.hp - 10 <= 0
                                  ? "Injured"
                                  : adventurer.status
                      }
                    : adventurer
            )
        );
    }

    function sendToCamp(id) {
        setAdventurers(current =>
            current.map(adventurer =>
                adventurer.id === id
                    ? { ...adventurer, status: "Resting" }
                    : adventurer
            )
        );
    }

    function changeStatus(id, status) {
        setAdventurers(current =>
            current.map(adventurer =>
                adventurer.id === id
                    ? { ...adventurer, status }
                    : adventurer
            )
        );
    }

    function addAdventurer() {
        const recruits = [
            {
                name: "Rowan",
                class: "Paladin",
                level: 7,
                hp: 85,
                maxHp: 85
            },
            {
                name: "Elara",
                class: "Archer",
                level: 6,
                hp: 65,
                maxHp: 65
            },
            {
                name: "Borin",
                class: "Berserker",
                level: 9,
                hp: 110,
                maxHp: 110
            },
            {
                name: "Sylas",
                class: "Warlock",
                level: 8,
                hp: 60,
                maxHp: 60
            }
        ];
      
        const recruit = recruits[Math.floor(Math.random() * recruits.length)];
      
        setAdventurers(current => {
            const nextId = Math.max(...current.map(adventurer => adventurer.id), 0) + 1;
        
            return [
                ...current,
                {
                    id: nextId,
                    ...recruit,
                    status: "Ready"
                }
            ];
        });
    }

    function removeAdventurer(id) {
        setAdventurers(current =>
            current.filter(adventurer => adventurer.id !== id)
        );
    }

    function recoverAdventurer(id) {
        setAdventurers(current =>
            current.map(adventurer =>
                adventurer.id === id
                    ? {
                          ...adventurer,
                          hp: adventurer.maxHp,
                          status: "Ready"
                      }
                    : adventurer
            )
        );

        setResetVersions(current => ({
            ...current,
            [id]: (current[id] || 0) + 1
        }));
    }

    function changeFilter(newFilter) {
        setFilter(newFilter);
    }

    function toggleReverse() {
        setReversed(current => !current);
    }

    const activeAdventurers = adventurers
        .filter(adventurer => adventurer.status !== "Resting")
        .filter(
            adventurer =>
                filter === "All" || adventurer.status === filter
        )
        .slice();

    if (reversed) {
        activeAdventurers.reverse();
    }

    const restingAdventurers = adventurers.filter(
        adventurer => adventurer.status === "Resting"
    );

    return (
        <div className="app">
            <Header />

            <Controls
                filter={filter}
                onFilterChange={changeFilter}
                reversed={reversed}
                onReverse={toggleReverse}
            />

            <Party
                adventurers={activeAdventurers}
                onDamage={damageAdventurer}
                onSendToCamp={sendToCamp}
                onChangeStatus={changeStatus}
                onAdd={addAdventurer}
                onRemove={removeAdventurer}
                resetVersions={resetVersions}
            />

            <Resting
                adventurers={restingAdventurers}
                onRecover={recoverAdventurer}
            />
        </div>
    );
}

export default App;