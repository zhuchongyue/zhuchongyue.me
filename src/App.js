import React, { Component } from 'react';
import './App.less';
import { BrowserRouter as Router, Link } from 'react-router-dom';

class App extends Component {

  componentDidMount() {
    
      document.addEventListener('touchmove', function (e) {
          e.preventDefault()
      })

      let canvas = document.getElementById('canvas')
      let ctx = canvas.getContext('2d')
      let dpr = devicePixelRatio || 1
      let width = window.innerWidth
      let height = window.innerHeight

      let start = 90, points, radius = 0

      let circle = Math.PI * 2, cos = Math.cos, random = Math.random

      canvas.width = width * dpr
      canvas.height = height * dpr

      ctx.scale(dpr, dpr)
      ctx.globalAlpha = 0.6

      function draw() {
        ctx.clearRect(0, 0, width, height)
        points = [
                  { x: 0, y: height * 0.7 + start }, 
                  { x: 0, y: height * 0.7 - start }
                ]
        while(points[1].x < width + start) 
          drawTriangle(points[0], points[1])
      }


      function drawTriangle(point1, point2) {
        ctx.beginPath()
        ctx.moveTo(point1.x, point1.y)
        ctx.lineTo(point2.x, point2.y)
        let x = point2.x + (random() * 2 - 0.25) * start,
            y = calThreePointY(point2.y)
        ctx.lineTo(x, y)
        ctx.closePath()
        radius -= circle /- 50
        console.log(radius)
        // eslint-disable-next-line 
        ctx.fillStyle = '#' + (cos(radius) * 127 + 128 << 16 | cos(radius + circle / 3) * 127 + 128 << 8 | cos(radius + circle / 3 * 2) * 127 + 128).toString(16)
        ctx.fill()
        points[0] = points[1]
        points[1] = { x, y}
      }

      function calThreePointY(point2Y) {

        let y = point2Y + (random() * 2 - 1.1) * start

        return (y > height || y < 0) ? calThreePointY(point2Y) : y;
      }


      document.onclick = draw
      document.ontouchstart = draw
      draw()
      
  }

  render() {
    return (
        <Router>
          <div>
            <div className="container">
              <h1>Alex Yue</h1>
              <h2>Front & Node & Java</h2>
              <div className="link"><Link to="/blog">Blog</Link></div>
              <div className="link"><a href="https://github.com/zhuchongyue">Github</a></div>
            </div>
            <canvas id="canvas"></canvas>
          </div>
        </Router>
    );
  }
}

export default App
