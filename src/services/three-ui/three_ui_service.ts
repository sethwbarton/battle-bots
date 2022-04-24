import { GameStartOptionType, UiService } from '../ui_service'
import { BattleBotsGameState } from '../../entities/battle_bots_game_state'
import * as THREE from 'three'
import {
  AmbientLight,
  Clock,
  Color,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Ship } from '../../entities/ship'
import { StarSystem } from '../../entities/star_system'
import { PlayerLocation } from '../../entities/player_location'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'

export class ThreeUiService implements UiService {
  private clock: Clock
  private readonly scene = new Scene()
  private readonly camera = new PerspectiveCamera(
    45,
    innerWidth / innerHeight,
    0.1,
    10000
  )
  private readonly renderer = new WebGLRenderer({
    antialias: true,
    canvas: document.getElementById('main-canvas') as HTMLCanvasElement,
  })
  private controls = new OrbitControls(this.camera, this.renderer.domElement)

  constructor() {
    this.renderer.setSize(innerWidth, innerHeight)
    this.renderer.setClearColor(new Color('rgb(100,100,100)'))
    this.clock = new Clock()
    this.scene.add(new THREE.AxesHelper(100))
    this.renderGameState(BattleBotsGameState.getInstance())
  }

  public async showStartScreen(): Promise<void> {}

  public async renderGameState(gameState: BattleBotsGameState) {
    this.justifyCamera(gameState.player.location)
    this.renderPlayerShip(gameState.player.currentShip)
    this.renderCurrentSystem(gameState.player.location.starSystem)
    this.render()
  }

  private justifyCamera(playerLocation: PlayerLocation) {
    this.camera.position.set(
      playerLocation.coords.x,
      playerLocation.coords.y + 10,
      playerLocation.coords.z
    )
    this.controls.update()
    this.controls.target.set(
      playerLocation.coords.x,
      playerLocation.coords.y,
      playerLocation.coords.z
    )
  }

  private renderCurrentSystem(currentStarSystem: StarSystem) {
    const starGeometry = new THREE.SphereGeometry(10)
    const starMaterial = new THREE.MeshBasicMaterial({ color: 'yellow' })
    const star = new Mesh(starGeometry, starMaterial)
    star.position.set(0, 0, 0)
    this.scene.add(star)
  }

  private renderPlayerShip(ship: Ship) {
    const geometry = new THREE.ConeGeometry(5, 20, 32)
    const material = new MeshBasicMaterial({ color: 0x00ff00 })
    const capsule = new Mesh(geometry, material)
    capsule.position.set(ship.coords.x, ship.coords.y, ship.coords.z)
    this.scene.add(capsule)
  }

  public async getGameStartType(): Promise<GameStartOptionType> {
    return 'new'
  }

  private adjustCanvasSize() {
    this.renderer.setSize(innerWidth, innerHeight)
    this.camera.aspect = innerWidth / innerHeight
    this.camera.updateProjectionMatrix()
  }

  private render() {
    this.renderer.render(this.scene, this.camera)
    this.controls.update()
    this.camera.updateProjectionMatrix()
    requestAnimationFrame(() => this.render())
    this.adjustCanvasSize()
  }
}
