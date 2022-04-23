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
    // 64 is sea level
    this.camera.position.set(0, 64, 0)
    this.controls.update()

    // Adding in a white ambient light
    const color = 0xffffff
    const intensity = 1
    const light = new AmbientLight(color, intensity)
    this.scene.add(light)

    this.camera.lookAt(new Vector3(0, 0, 0))
    this.renderer.setSize(innerWidth, innerHeight)
    this.renderer.setClearColor(new Color('rgb(0,0,0)'))
    this.clock = new Clock()
    this.renderGameState(BattleBotsGameState.getInstance())
    this.render()
  }

  public async showStartScreen(): Promise<void> {}

  public async renderGameState(gameState: BattleBotsGameState) {
    this.renderPlayerShip(gameState.player.currentShip)
    this.renderCurrentSystem(gameState.player.location.starSystem)
  }

  private setCameraToPlayerLocation(playerLocation: PlayerLocation) {
    // Set the camera position to the player's current location in the system
    // this.camera.position.set()
  }

  private renderCurrentSystem(currentStarSystem: StarSystem) {
    const starGeometry = new THREE.SphereGeometry(10)
    const starMaterial = new THREE.MeshBasicMaterial({ color: 'yellow' })
    const star = new Mesh(starGeometry, starMaterial)
    this.scene.add(star)
  }

  private renderPlayerShip(ship: Ship) {
    const geometry = new THREE.CapsuleGeometry(1, 1, 4, 8)
    const material = new MeshBasicMaterial({ color: 0x00ff00 })
    const capsule = new Mesh(geometry, material)
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
    requestAnimationFrame(() => this.render())
    this.adjustCanvasSize()
  }
}
