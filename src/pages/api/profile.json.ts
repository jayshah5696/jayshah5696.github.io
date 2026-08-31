import type { APIRoute } from 'astro';
import {
  SITE_TITLE,
  SITE_TAGLINE,
  SITE_DESCRIPTION,
  SITE_URL,
  SITE_EMAIL,
  SOCIAL_LINKS,
  SAME_AS_LINKS,
  ORGANIZATION_INFO,
} from '../../consts';

export const GET: APIRoute = async () => {
  const profile = {
    name: SITE_TITLE,
    headline: SITE_TAGLINE,
    description: SITE_DESCRIPTION,
    current_role: {
      title: 'Senior Machine Learning Engineer',
      organization: '6sense',
      url: 'https://6sense.com',
      focus_areas: [
        'Intent Intelligence & Foundational Models',
        'Custom Embeddings & Semantic Search',
        'Entity Resolution with Dense Embeddings & Matryoshka Representation Learning',
        'Contextual Knowledge Graphs',
        'Agent Evaluation Systems & Synthetic Data Generation',
      ],
    },
    previous_experience: [
      {
        organization: 'Avathon',
        url: 'https://avathon.com',
        summary:
          'Built retrieval-augmented generation systems, Model Context Protocol (MCP) agent platforms, anomaly detection products, and foundation-model operations.',
      },
    ],
    education: [
      {
        institution: 'Texas A&M University',
        url: 'https://www.tamu.edu',
        degree: 'Master of Science',
        focus: 'Wind-energy failure prediction & statistical modeling',
      },
    ],
    patents: [
      {
        id: 'US20230213560A1',
        title: 'Calculating energy loss during an outage',
        url: 'https://patents.google.com/patent/US20230213560A1/en',
        filing_date: '2021-12-30',
      },
      {
        id: 'US20230214703A1',
        title: 'Predicting energy production for energy generating assets',
        url: 'https://patents.google.com/patent/US20230214703A1/en',
        filing_date: '2021-12-30',
      },
      {
        id: 'IN201721044402',
        title: 'Dimension Measurement Using Image Processing',
        url: 'https://patents.google.com/patent/IN201721044402A/en',
        filing_date: '2017-12-11',
      },
    ],
    honors: [
      'Winner at Ragathon by LlamaIndex (Feb 2024)',
      "Outstanding Master's of Science Student (Apr 2019)",
      '2nd Runner-up at Texas Datathon by Citadel (Feb 2018)',
    ],
    contact: {
      email: SITE_EMAIL,
      contact_point_type: ORGANIZATION_INFO.contactPoint.contactType,
      website: SITE_URL,
    },
    social_profiles: SOCIAL_LINKS,
    same_as: SAME_AS_LINKS,
    agent_resources: {
      openapi_json: `${SITE_URL}/openapi.json`,
      openapi_yaml: `${SITE_URL}/openapi.yaml`,
      llms_txt: `${SITE_URL}/llms.txt`,
      llms_full_txt: `${SITE_URL}/llms-full.txt`,
      agent_instructions: `${SITE_URL}/.well-known/agent-instructions.md`,
      tools_json: `${SITE_URL}/api/tools.json`,
    },
  };

  return new Response(JSON.stringify(profile, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Vary': 'Accept, Accept-Encoding',
    },
  });
};
