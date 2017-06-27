import createElement from 'inferno-create-element'
import InfernoComponent from 'inferno-component'

import PixiFrame from 'demo/PixiFrame'

const getMapName = () => {
    return window.location.hash.length && window.location.hash.slice(1)
}

const setMapName = (mapName: string) => {
    window.location.hash = mapName
}

const mapExists = {
    'pixi-map': true,
    'pixi-map-degree': true,
    'pixi-map-hover': true,
}

interface State {
    mapName: string | null
}

export default class Client extends InfernoComponent<void, State> {
    private handleHashChange: { (): void }

    constructor() {
        super()
        this.state = { mapName: getMapName() }
        this.handleHashChange = () => {
            this.setState({ mapName: getMapName() })
        }
    }

    render() {
        const mapName = this.state.mapName
        return (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                }}
            >
                {mapName === 'pixi-map' && <PixiFrame />}
                {mapName === 'pixi-map-degree' && <PixiFrame type="degree" />}
                {mapName === 'pixi-map-hover' && <PixiFrame type="hover" />}
                {!mapExists[mapName] &&
                    <fieldset>
                        <legend>Choose a map visualization</legend>
                        <button onClick={() => setMapName('pixi-map')}>
                            Pixi Map
                        </button>
                        &nbsp;
                        <button onClick={() => setMapName('pixi-map-degree')}>
                            Pixi Map (degree weight)
                        </button>
                        &nbsp;
                        <button onClick={() => setMapName('pixi-map-hover')}>
                            Pixi Map (hover experiment)
                        </button>
                    </fieldset>}
            </div>
        )
    }

    componentDidMount() {
        window.addEventListener('hashchange', this.handleHashChange)
    }

    componentWillUnmount() {
        window.removeEventListener('hashchange', this.handleHashChange)
    }
}
