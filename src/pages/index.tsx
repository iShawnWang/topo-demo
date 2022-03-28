import React, { useEffect } from 'react';
import G6 from '@antv/g6';
import data from './data';
import { Row, Radio } from 'antd';
import useUrlState from '@ahooksjs/use-url-state';
import { useUpdateEffect } from 'ahooks';

const LayoutOption = [
  {
    label: 'gForce',
    layout: {
      type: 'gForce',
      gpuEnabled: true,
      workerEnabled: true,
      preventOverlap: true,
      linkDistance: 300,
      nodeSize: 30,
      nodeSpacing: 100,
    },
  },
  {
    label: 'force',
    layout: {
      type: 'force',
      preventOverlap: true,
      linkDistance: 300, // 可选，边长
      collideStrength: 0.8, // 可选
      nodeSize: 30, // 可选
      alpha: 0.3, // 可选
      alphaDecay: 0.028, // 可选
      alphaMin: 0.01, // 可选
    },
  },
  {
    label: 'circular',
    layout: {
      type: 'circular',
      angleRatio: 1, // 可选
    },
  },
  {
    label: 'radial',
    layout: {
      type: 'radial',
      linkDistance: 300, // 可选，边长
      maxIteration: 1000, // 可选
      unitRadius: 250, // 可选
      preventOverlap: true, // 可选，必须配合 nodeSize
      nodeSize: 30, // 可选
      strictRadial: false, // 可选
      workerEnabled: true,
    },
  },
  {
    label: 'concentric',
    layout: {
      type: 'concentric',
      linkDistance: 500,
      preventOverlap: true,
      minNodeSpacing: 200,
      nodeSize: 100, // 可选
      workerEnabled: true, // 可选，开启 web-worker
    },
  },
  {
    label: 'dagre',
    layout: {
      type: 'dagre',
      direction: 'LR',
    },
  },
  {
    label: 'fruchterman',
    layout: {
      type: 'fruchterman',
      gravity: 1, // 可选
      workerEnabled: true,
      gpuEnabled: true,
    },
  },
  {
    label: 'mds',
    layout: {
      type: 'mds',
      workerEnabled: true, // 可选，开启 web-worker
      linkDistance: 300,
    },
  },
  {
    label: 'grid',
    layout: {
      type: 'grid',
      preventOverlap: true, // 可选，必须配合 nodeSize
      preventOverlapPdding: 20, // 可选
      nodeSize: 30, // 可选
      condense: false, // 可选
      workerEnabled: true, // 可选，开启 web-worker
    },
  },
  {
    label: 'forceAtlas2',
    layout: {
      type: 'forceAtlas2',
      workerEnabled: true,
      preventOverlap: true,
      kr: 300,
    },
  },
];
export default () => {
  const ref = React.useRef<any>(null);
  const graphRef = React.useRef<any>(null);
  const [layout, setLayout] = useUrlState({ layout: 'gForce' });

  useEffect(() => {
    graphRef.current = new G6.Graph({
      container: ref.current,
      width: window.innerWidth,
      height: window.innerHeight - 64,
      fitView: true,
      modes: {
        default: [
          'drag-canvas',
          'drag-combo',
          'zoom-canvas',
          'drag-node',
          'click-select',
        ],
      },
      groupByTypes: false,
      layout: LayoutOption.find((l) => l.label === layout.layout)!.layout,
      defaultNode: {
        type: 'node',
        labelCfg: {
          style: {
            fill: '#000000A6',
            fontSize: 10,
          },
        },
        style: {
          stroke: '#72CC4A',
          width: 150,
        },
      },
      defaultEdge: {
        type: 'quadratic',
      },
    });

    graphRef.current.data(data);
    graphRef.current.render();
  }, []);

  useUpdateEffect(() => {
    window.location.reload();
  }, [layout]);

  return (
    <Row>
      <div>
        <Radio.Group
          value={layout.layout}
          onChange={(e) => setLayout({ layout: e.target.value })}
          buttonStyle="solid"
        >
          {LayoutOption.map((o) => {
            return (
              <Radio.Button key={o.label} value={o.label}>
                {o.label}
              </Radio.Button>
            );
          })}
        </Radio.Group>
      </div>
      <div>
        <div ref={ref}></div>
      </div>
    </Row>
  );
};
