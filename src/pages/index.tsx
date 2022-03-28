import React, { useEffect, useState } from 'react';
import G6 from '@antv/g6';
import data from './data';
import { Row, Radio, Modal, Button } from 'antd';
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
      linkDistance: 300,
      collideStrength: 0.8,
      nodeSize: 30,
      alpha: 0.3,
      alphaDecay: 0.028,
      alphaMin: 0.01,
    },
  },
  {
    label: 'circular',
    layout: {
      type: 'circular',
      angleRatio: 1,
    },
  },
  {
    label: 'radial',
    layout: {
      type: 'radial',
      linkDistance: 300,
      maxIteration: 1000,
      unitRadius: 250,
      preventOverlap: true,
      nodeSize: 30,
      strictRadial: false,
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
      nodeSize: 100,
      workerEnabled: true,
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
      gravity: 1,
      workerEnabled: true,
      gpuEnabled: true,
    },
  },
  {
    label: 'mds',
    layout: {
      type: 'mds',
      workerEnabled: true,
      linkDistance: 300,
    },
  },
  {
    label: 'grid',
    layout: {
      type: 'grid',
      preventOverlap: true,
      preventOverlapPdding: 20,
      nodeSize: 30,
      condense: false,
      workerEnabled: true,
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

const EdgeOption = [
  { label: 'line' },
  { label: 'arc' },
  { label: 'quadratic' },
  { label: 'cubic' },
];

export default () => {
  const ref = React.useRef<any>(null);
  const graphRef = React.useRef<any>(null);
  const [layout, setLayout] = useUrlState({
    layout: 'gForce',
    edge: 'quadratic',
  });
  const [modal, setModal] = useState({ visible: false });

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
        type: EdgeOption.find((l) => l.label === layout.edge)!.label,
      },
    });

    graphRef.current.data(data);
    graphRef.current.render();
  }, []);

  useUpdateEffect(() => {
    window.location.reload();
  }, [layout]);

  return (
    <Row style={{ padding: 12 }}>
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div>
            图布局
            <Radio.Group
              style={{ marginLeft: 8 }}
              value={layout.layout}
              onChange={(e) => setLayout({ ...layout, layout: e.target.value })}
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
            边儿
            <Radio.Group
              style={{ marginLeft: 8 }}
              value={layout.edge}
              onChange={(e) => {
                setLayout({ ...layout, edge: e.target.value });
              }}
              buttonStyle="solid"
            >
              {EdgeOption.map((o) => {
                return (
                  <Radio.Button key={o.label} value={o.label}>
                    {o.label}
                  </Radio.Button>
                );
              })}
            </Radio.Group>
          </div>
        </div>
        <Button
          type="primary"
          onClick={() => {
            setModal({ visible: true });
          }}
        >
          说明
        </Button>
        <Modal
          title="相关资料"
          visible={modal.visible}
          onCancel={() => {
            setModal({ visible: false });
          }}
        >
          数据结构为图, 选择 AntV G6 图布局
          <p>
            1. 可以做相邻节点高亮 \n 2. 子节点展开 3.自定义节点样式 4.Legend
            图例
          </p>
          <div>
            <a href="https://g6.antv.vision/zh/examples/gallery">G6 图表示例</a>
          </div>
          <div>
            <a href="https://g6.antv.vision/zh/docs/api/graphLayout/guide">
              G6 图布局配置项:{' '}
            </a>
          </div>
          <div>---</div>
          <div>单个应用调用链可以用树布局</div>
        </Modal>
      </div>
      <div>
        <div ref={ref}></div>
      </div>
    </Row>
  );
};
