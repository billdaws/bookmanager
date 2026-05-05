# ComicVine API

**Base URL:** `https://comicvine.gamespot.com/api/`  
**Docs:** `https://comicvine.gamespot.com/api/documentation`

## Authentication & Rate Limits

- Free API key, passed as `?api_key=` on every request — register at comicvine.gamespot.com
- 200 requests per resource per hour
- Velocity detection blocks access if requests fire too fast — cache responses aggressively

## Response Format

Supports JSON, XML, or JSONP via `?format=json`.

All responses use a standard envelope:

```json
{
  "status_code": 1,
  "error": "OK",
  "number_of_total_results": 500,
  "number_of_page_results": 100,
  "results": [...]
}
```

| Status code | Meaning |
|---|---|
| `1` | OK |
| `100` | Invalid API key |
| `101` | Not found |

## Endpoints

Each resource type has a detail endpoint (`/resource/4000-{id}/`) and a list endpoint (`/resources/`). IDs in detail URLs follow the format `4000-{numeric_id}` where `4000` is the resource type prefix.

| Resource | Endpoints | Notes |
|---|---|---|
| **Volumes** | `/volume/`, `/volumes/` | Primary "series" concept — a named run of issues |
| **Issues** | `/issue/`, `/issues/` | Individual issues within a volume |
| **Publishers** | `/publisher/`, `/publishers/` | DC, Marvel, Image, etc. |
| **People** | `/person/`, `/people/` | Creators: writers, artists, etc. |
| **Characters** | `/character/`, `/characters/` | |
| **Story Arcs** | `/story_arc/`, `/story_arcs/` | |
| **Teams** | `/team/`, `/teams/` | |
| **Search** | `/search/` | Cross-resource search |

## Query Parameters

| Parameter | Description |
|---|---|
| `api_key` | Required on every request |
| `format` | `json`, `xml`, or `jsonp` |
| `field_list` | Comma-delimited fields to return — use this to keep payloads small |
| `filter` | `field:value` filtering on list endpoints |
| `limit` | Results per page (max 100; default 10 on `/search/`) |
| `offset` | Pagination offset |
| `sort` | `field:asc` or `field:desc` |

## Typical Metadata Lookup Flow

```
# 1. Find the series (volume)
GET /search/?query=Batman&resources=volume&format=json&api_key=KEY

# 2. Get the issue list for a volume
GET /volume/4000-{id}/?field_list=issues&format=json&api_key=KEY

# 3. Get detail for a specific issue
GET /issue/4000-{id}/?field_list=name,issue_number,cover_date,image,description&format=json&api_key=KEY
```

The search endpoint is the easiest entry point. Use `field_list` aggressively on detail requests to avoid fetching unnecessary data and stay within rate limits.

## Usage Restrictions

- **Non-commercial use only** — commercial use revokes the key
- **No competing products** — cannot be used to build an alternative structured comic database
- **Attribution required** — must link back to ComicVine on any page that displays the data
- **No redistribution** of raw API data
