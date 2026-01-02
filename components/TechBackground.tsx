'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function TechBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Neural Network Parameters
    const nodeCount = 80;
    const nodes: THREE.Mesh[] = [];
    const nodePositions: { x: number; y: number; z: number; vx: number; vy: number; vz: number }[] = [];
    const maxDistance = 20;

    // Create neural nodes (spheres)
    const nodeGeometry = new THREE.SphereGeometry(0.3, 8, 8);

    for (let i = 0; i < nodeCount; i++) {
      // Gradient color from cyan to blue
      const t = i / nodeCount;
      const color = new THREE.Color().setHSL(0.5 + t * 0.1, 1, 0.5);

      const nodeMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.8,
      });

      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);

      // Random position
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 50;

      node.position.set(x, y, z);
      scene.add(node);
      nodes.push(node);

      // Store position and velocity
      nodePositions.push({
        x, y, z,
        vx: (Math.random() - 0.5) * 0.02,
        vy: (Math.random() - 0.5) * 0.02,
        vz: (Math.random() - 0.5) * 0.01,
      });
    }

    // Create lines geometry for connections
    const lineMaterial = new THREE.LineBasicMaterial({
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });

    const linesGeometry = new THREE.BufferGeometry();
    const lines = new THREE.LineSegments(linesGeometry, lineMaterial);
    scene.add(lines);

    // Create data particles that flow along connections
    const particleCount = 50;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 100;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      // Cyan color for particles
      particleColors[i * 3] = 0;
      particleColors[i * 3 + 1] = 1;
      particleColors[i * 3 + 2] = 1;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.5,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Animation
    let time = 0;
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.01;

      // Update node positions (slow drift)
      nodes.forEach((node, i) => {
        const pos = nodePositions[i];

        pos.x += pos.vx;
        pos.y += pos.vy;
        pos.z += pos.vz;

        // Bounce off boundaries
        if (Math.abs(pos.x) > 50) pos.vx *= -1;
        if (Math.abs(pos.y) > 50) pos.vy *= -1;
        if (Math.abs(pos.z) > 25) pos.vz *= -1;

        node.position.set(pos.x, pos.y, pos.z);

        // Pulsating effect
        const scale = 1 + Math.sin(time + i * 0.5) * 0.3;
        node.scale.setScalar(scale);
      });

      // Update connections between nearby nodes
      const linePositions: number[] = [];
      const lineColors: number[] = [];

      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          const pos1 = nodePositions[i];
          const pos2 = nodePositions[j];

          const dx = pos1.x - pos2.x;
          const dy = pos1.y - pos2.y;
          const dz = pos1.z - pos2.z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < maxDistance) {
            linePositions.push(pos1.x, pos1.y, pos1.z);
            linePositions.push(pos2.x, pos2.y, pos2.z);

            // Color based on distance and time (pulsating)
            const strength = 1 - distance / maxDistance;
            const pulse = (Math.sin(time * 2 + i + j) + 1) * 0.5;
            const colorStrength = strength * pulse;

            // Cyan to blue gradient
            lineColors.push(0, colorStrength, colorStrength * 1.2);
            lineColors.push(0, colorStrength * 0.8, colorStrength);
          }
        }
      }

      linesGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(linePositions, 3)
      );
      linesGeometry.setAttribute(
        'color',
        new THREE.Float32BufferAttribute(lineColors, 3)
      );

      // Update particles (flowing along connections)
      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += Math.sin(time + i) * 0.1;
        positions[i * 3 + 1] += Math.cos(time + i) * 0.1;
        positions[i * 3 + 2] += Math.sin(time * 0.5 + i) * 0.05;

        // Wrap around
        if (Math.abs(positions[i * 3]) > 50) positions[i * 3] *= -0.95;
        if (Math.abs(positions[i * 3 + 1]) > 50) positions[i * 3 + 1] *= -0.95;
        if (Math.abs(positions[i * 3 + 2]) > 25) positions[i * 3 + 2] *= -0.95;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Slow camera rotation for dynamic view
      camera.position.x = Math.sin(time * 0.05) * 5;
      camera.position.y = Math.cos(time * 0.05) * 5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      nodeGeometry.dispose();
      nodes.forEach(node => (node.material as THREE.Material).dispose());
      linesGeometry.dispose();
      lineMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0"
      style={{ opacity: 0.3 }}
    />
  );
}
