import { Component } from 'react'
import Taro, { Current } from '@tarojs/taro'
import { View, CoverView, Canvas, Image, MovableArea, MovableView } from '@tarojs/components'
import './index.scss'
// import allSeats from './seats.json'
// const seats = allSeats.commonSeats
import seats from './data.json'
const CELL_WIDTH = 20
const CELL_HEIGHT = 20
export default class Index extends Component {

  constructor(props) {
    super(props)
    this.state = {
			moveY: 0,
			scale: 1,
			selectedSeats: {}
    }
  }

  componentWillMount () {
    
  }

  componentDidMount () {
    this.getMaxRowAndCol()
  }

	// 计算最大x和y，乘以单元格宽高就是整个选座区域的最大值
	getMaxRowAndCol = () => {
		seats.sort((a, b) => a.x - b.x)
		const maxX = seats[seats.length - 1].x

		seats.sort((a, b) => a.y - b.y)
		const maxY = seats[seats.length - 1].y

		this.setState({
			areaWidth: maxX * CELL_WIDTH,
			areaHeight: maxY * CELL_HEIGHT
		})
	}

	onMove = (e) => {
		this.setState({ moveY: e.detail.y })
	}

	onScale = (e) => {
		this.setState({
			moveY: e.detail.y,
			scale: e.detail.scale 
		})
	}

	// 选座
  click = (item) => {
    console.log('选择了', item.rowNo + '排' + item.colNo + '列')
		let { selectedSeats } = this.state
		let currentKey = item.rowNo + '_' + item.colNo
		let isSelected = !!selectedSeats[currentKey]
		if (isSelected) {
			delete selectedSeats[currentKey]
		} else {
			selectedSeats[currentKey] = {
				rowNo: item.rowNo,
				colNo: item.colNo
			}
		}
		this.setState({ selectedSeats })
  }

	// 标尺
	renderRowNumber = () => {
		const hash = {}
		const newArray = seats.reduce((item, next)=>{
			hash[next.rowNo] ? '' : hash[next.rowNo] = true && item.push(next)
			return item
		},[])
		console.info('去重后的数组:', newArray);
		console.log('sss', this.state.scale)
		const { moveY, scale } = this.state
		return (
			<View
				className='seatsRowNumber'
				style={{
					width: CELL_WIDTH,
					// 因为定位元素无法让父级获取高度，所以通过最后一个元素的y
					height: newArray[newArray.length - 1].y * CELL_HEIGHT - CELL_HEIGHT,
					top: (moveY + newArray[0].y * CELL_HEIGHT),
					transform: `scale(${scale})`
				}}
					>
				{
					newArray?.map((item, index) => {
						return (
							<View
								key={index}
								className='seatsRowNumberItem'
								style={{
									width: CELL_WIDTH,
									height: CELL_HEIGHT,
									top: item.y * CELL_HEIGHT - CELL_HEIGHT * 2
								}}>{item.rowNo}</View>
						)
					})
				}
			</View>
		)
	}

	// 区域预览图
	renderMiniArea = () => {
		const { areaWidth, areaHeight, selectedSeats } = this.state
		return (
			<View className='seatsMini' style={{ width: areaWidth, height: areaHeight }}>
				<View className='seatsMiniView'>
					{
						seats.map((item, index) => {
							let currentKey = item.rowNo + '_' + item.colNo
							let isSelected = !!selectedSeats[currentKey]
							return (
								<View
									key={index}
									className='seatMiniCell'
									style={{
										width: CELL_WIDTH,
										height: CELL_HEIGHT,
										left: item.x * CELL_WIDTH,
										top: item.y * CELL_HEIGHT
									}}>
									<View className='seatMiniItem' style={{background: isSelected ? '#FF9F0E' : '#2CC59F'}}></View>
								</View>
							)
						})
					}
				</View>
			</View>
		)
	}

  render () {
		const { areaWidth, areaHeight, selectedSeats } = this.state
    return (
			<View className='wrap'>
				<View className='priceInfo'>

				</View>
				<View className='seatsAreaMain' style={{ height: areaHeight }}>
					<MovableArea className='seatsArea' scaleArea={true}>
						{this.renderRowNumber()}
						<MovableView
							className='seatsView'
							scale
							inertia
							friction={0}
							damping={0}
							scaleValue={1}
							scaleMax={2}
							direction='all'
							style={{ width: areaWidth, height: areaHeight }}
							onChange={this.onMove}
							onScale={this.onScale}
							>
							{
								seats.map((item, index) => {
									let currentKey = item.rowNo + '_' + item.colNo
									let isSelected = !!selectedSeats[currentKey]
									return (
										<View
											key={index}
											className='seatCell'
											style={{
												width: CELL_WIDTH,
												height: CELL_HEIGHT,
												left: item.x * CELL_WIDTH,
												top: item.y * CELL_HEIGHT
											}}
											onClick={() => this.click(item)}>
											<View className='seatItem' style={{background: isSelected ? '#FF9F0E' : '#2CC59F'}}></View>
										</View>
									)
								})
							}
						</MovableView>
					</MovableArea>
					{/* {this.renderMiniArea()} */}
				</View>
				<View className='seatsInfo'>
					{
						Object.values(selectedSeats)?.map((item, index) => {
							return (
								<View key={index}>{item.rowNo + '排' + item.colNo + '列'}</View>
							)
						})
					}
				</View>
			</View>
    )
  }
}
